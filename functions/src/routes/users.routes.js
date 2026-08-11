const express = require('express');
const { db } = require('../lib/firebaseAdmin');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();

router.get('/me', requireAuth, async (req, res) => {
  try {
    const ref = db.collection('users').doc(req.user.uid);
    const doc = await ref.get();

    if (!doc.exists) {
      const profile = {
        uid: req.user.uid,
        email: req.user.email || null,
        name: req.user.name || '',
        role: 'user',
        tier: 'Standard',
        balance: 0,
        createdAt: new Date().toISOString(),
      };
      await ref.set(profile);
      return res.json(profile);
    }

    res.json(doc.data());
  } catch (err) {
    console.error('get profile error', err);
    res.status(500).json({ error: 'Could not load profile' });
  }
});

module.exports = router;