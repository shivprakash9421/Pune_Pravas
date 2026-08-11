const express = require('express');
const { db } = require('../lib/firebaseAdmin');
const { requireAuth } = require('../middleware/auth');

const router = express.Router();
const FARES = { metro: 30, bus: 25, pass: 650 };

// Purchases always go through the server so fare/expiry can't be
// tampered with client-side.
router.post('/', requireAuth, async (req, res) => {
  try {
    const { type, from, to, route } = req.body;
    if (!['metro', 'bus', 'pass'].includes(type)) {
      return res.status(400).json({ error: 'type must be metro, bus, or pass' });
    }

    const now = new Date();
    const ticket = {
      userId: req.user.uid,
      type,
      from: from || null,
      to: to || null,
      route: type === 'pass' ? (route || 'Monthly All-Routes') : null,
      fare: FARES[type],
      status: type === 'pass' ? 'active' : 'valid',
      purchasedAt: now.toISOString(),
      expiresAt: type === 'pass'
        ? new Date(now.getFullYear(), now.getMonth() + 1, now.getDate()).toISOString()
        : null,
    };

    const ref = await db.collection('tickets').add(ticket);
    res.status(201).json({ id: ref.id, ...ticket });
  } catch (err) {
    console.error('purchase ticket error', err);
    res.status(500).json({ error: 'Could not purchase ticket' });
  }
});

module.exports = router;