// functions/src/lib/firebaseAdmin.js
const admin = require('firebase-admin');

if (!admin.apps.length) {
  let credential;

  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    try {
      const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
      credential = admin.credential.cert(serviceAccount);
    } catch (err) {
      console.error('FIREBASE_SERVICE_ACCOUNT_KEY is set but is not valid JSON:', err.message);
      throw err;
    }
  } else {
    // This branch only works on real Google infra (Cloud Functions/Run) — not Render.
    console.warn('FIREBASE_SERVICE_ACCOUNT_KEY not set, falling back to applicationDefault().');
    credential = admin.credential.applicationDefault();
  }

  admin.initializeApp({ credential });
}

module.exports = {
  admin,
  auth: admin.auth(),
  db: admin.firestore(),
};