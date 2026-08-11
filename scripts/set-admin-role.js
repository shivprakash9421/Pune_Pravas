/**
 * Run locally, once. Never deploy this file's usage as an endpoint.
 * 1. Firebase Console → Project Settings → Service Accounts → Generate new private key
 *    Save as scripts/serviceAccountKey.json (gitignored — see below)
 * 2. node scripts/set-admin-role.js shivprakash0244@gmail.com
 */
const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');

admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });

const email = process.argv[2];
if (!email) {
  console.error('Usage: node scripts/set-admin-role.js <email>');
  process.exit(1);
}

(async () => {
  const user = await admin.auth().getUserByEmail(email);
  await admin.auth().setCustomUserClaims(user.uid, { admin: true, role: 'admin' });
  await admin.firestore().collection('users').doc(user.uid).set(
    { role: 'admin', email },
    { merge: true }
  );
  console.log(`${email} is now an admin. Sign out and back in on the site.`);
  process.exit(0);
})();