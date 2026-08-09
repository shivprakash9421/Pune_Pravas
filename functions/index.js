const {setGlobalOptions} = require("firebase-functions");
const {onRequest, onCall, HttpsError} = require("firebase-functions/https");
const {defineSecret} = require("firebase-functions/params");
const admin = require("firebase-admin");
const crypto = require("crypto");

admin.initializeApp();
const db = admin.firestore();
const adminBootstrapEmail = defineSecret("ADMIN_BOOTSTRAP_EMAIL");
setGlobalOptions({region: "asia-south1", maxInstances: 10});

function sendError(res, code, message) {
  return res.status(code).json({error: {code, message}});
}

function keyHash(key) {
  return crypto.createHash("sha256").update(key).digest("hex");
}

function newApiKey() {
  return `pp_live_${crypto.randomBytes(32).toString("base64url")}`;
}

async function authenticate(req) {
  const header = req.get("authorization") || "";
  if (!header.startsWith("Bearer ")) throw new Error("A Firebase bearer token is required.");
  return admin.auth().verifyIdToken(header.slice(7));
}

async function requireAdmin(req) {
  const decoded = await authenticate(req);
  if (decoded.admin !== true) throw new Error("Administrator access is required.");
  return decoded;
}

exports.bootstrapAdmin = onCall({secrets: [adminBootstrapEmail]}, async (request) => {
  if (!request.auth) throw new HttpsError("unauthenticated", "Sign in first.");
  const permittedEmail = adminBootstrapEmail.value();
  if (!permittedEmail || request.auth.token.email !== permittedEmail) {
    throw new HttpsError("permission-denied", "This account is not permitted to bootstrap admin access.");
  }
  await admin.auth().setCustomUserClaims(request.auth.uid, {admin: true});
  await db.collection("users").doc(request.auth.uid).set({role: "admin", updatedAt: admin.firestore.FieldValue.serverTimestamp()}, {merge: true});
  return {ok: true, message: "Admin role granted. Sign out and back in to refresh your token."};
});

exports.createUserProfile = onCall(async (request) => {
  if (!request.auth) throw new HttpsError("unauthenticated", "Sign in first.");
  const name = String(request.data?.name || request.auth.token.name || "Member").trim().slice(0, 80);
  await db.collection("users").doc(request.auth.uid).set({
    name,
    email: request.auth.token.email || null,
    role: request.auth.token.admin ? "admin" : "user",
    tier: "Free",
    balance: 0,
    updatedAt: admin.firestore.FieldValue.serverTimestamp(),
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
  }, {merge: true});
  return {ok: true};
});

exports.api = onRequest(async (req, res) => {
  res.set("Access-Control-Allow-Origin", process.env.ALLOWED_ORIGIN || "*");
  res.set("Access-Control-Allow-Headers", "Authorization, Content-Type, X-API-Key");
  res.set("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  if (req.method === "OPTIONS") return res.status(204).send("");

  const path = req.path.replace(/^\/+|\/+$/g, "");
  if (req.method === "GET" && path === "health") return res.json({status: "ok", service: "Pune Pravas API"});

  try {
    if (req.method === "GET" && path === "me") {
      const user = await authenticate(req);
      const profile = await db.collection("users").doc(user.uid).get();
      return res.json({uid: user.uid, email: user.email, claims: user.admin ? {admin: true} : {}, profile: profile.data() || null});
    }

    if (req.method === "GET" && path === "admin/dashboard") {
      await requireAdmin(req);
      const [users, keys] = await Promise.all([db.collection("users").count().get(), db.collection("apiKeys").where("revoked", "==", false).count().get()]);
      return res.json({users: users.data().count, activeApiKeys: keys.data().count, generatedAt: new Date().toISOString()});
    }

    if (path === "admin/api-keys" && req.method === "GET") {
      await requireAdmin(req);
      const snapshot = await db.collection("apiKeys").orderBy("createdAt", "desc").get();
      return res.json({items: snapshot.docs.map((doc) => ({id: doc.id, ...doc.data(), keyHash: undefined}))});
    }

    if (path === "admin/api-keys" && req.method === "POST") {
      const user = await requireAdmin(req);
      const name = String(req.body?.name || "Untitled key").trim().slice(0, 80);
      if (!name) return sendError(res, 400, "A key name is required.");
      const apiKey = newApiKey();
      const doc = await db.collection("apiKeys").add({
        name, prefix: apiKey.slice(0, 15), keyHash: keyHash(apiKey), revoked: false,
        createdBy: user.uid, createdAt: admin.firestore.FieldValue.serverTimestamp(), lastUsedAt: null,
      });
      return res.status(201).json({id: doc.id, name, apiKey, warning: "Copy this key now; it cannot be retrieved again."});
    }

    const match = path.match(/^admin\/api-keys\/([^/]+)$/);
    if (match && req.method === "DELETE") {
      await requireAdmin(req);
      await db.collection("apiKeys").doc(match[1]).set({revoked: true, revokedAt: admin.firestore.FieldValue.serverTimestamp()}, {merge: true});
      return res.status(204).send();
    }
    return sendError(res, 404, "Endpoint not found.");
  } catch (error) {
    const isAdminError = /Administrator/.test(error.message);
    return sendError(res, isAdminError ? 403 : 401, error.message || "Unauthorized.");
  }
});
