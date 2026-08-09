const { onCall, onRequest } = require('firebase-functions/v2/https');
const { db } = require('../lib/firebaseAdmin');
const { authenticate } = require('../lib/auth');

exports.createUserProfile = onCall(async (request) => {
  if (!request.auth) throw new Error('Unauthenticated');

  const uid = request.auth.uid;
  const email = request.auth.token.email;
  const name = request.data.name || '';

  const userRef = db.collection('users').doc(uid);
  const doc = await userRef.get();

  if (!doc.exists) {
    await userRef.set({
      uid,
      email,
      name,
      role: 'user',
      tier: 'Standard',
      balance: 0,
      createdAt: new Date().toISOString()
    });
  }
  return { success: true };
});

exports.me = onRequest(async (req, res) => {
  try {
    const decodedToken = await authenticate(req);
    const userDoc = await db.collection('users').doc(decodedToken.uid).get();
    
    if (!userDoc.exists) {
      return res.status(404).json({ error: 'User profile not found' });
    }
    
    res.json(userDoc.data());
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
});

exports.updatePreferences = onCall(async (request) => {
  if (!request.auth) throw new Error('Unauthenticated');
  const uid = request.auth.uid;
  
  await db.collection('preferences').doc(uid).set({
    ...request.data,
    updatedAt: new Date().toISOString()
  }, { merge: true });
  
  return { success: true };
});