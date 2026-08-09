const { onCall } = require('firebase-functions/v2/https');
const { defineSecret } = require('firebase-functions/params');
const { auth, db } = require('../lib/firebaseAdmin');

const ADMIN_BOOTSTRAP_EMAIL = defineSecret('ADMIN_BOOTSTRAP_EMAIL');

exports.bootstrapAdmin = onCall({ secrets: [ADMIN_BOOTSTRAP_EMAIL] }, async (request) => {
  if (!request.auth) {
    throw new Error('Unauthenticated');
  }

  const uid = request.auth.uid;
  const email = request.auth.token.email;
  
  if (email !== ADMIN_BOOTSTRAP_EMAIL.value()) {
    throw new Error('Unauthorized: Email does not match admin bootstrap email.');
  }

  // Grant the custom admin claim
  await auth.setCustomUserClaims(uid, { admin: true, role: 'admin' });
  
  // Sync the role to the Firestore users collection
  await db.collection('users').doc(uid).set({ role: 'admin' }, { merge: true });

  return { success: true, message: 'Admin privileges granted. Please sign out and sign back in.' };
});