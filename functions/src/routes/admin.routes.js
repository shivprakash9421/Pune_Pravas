const express = require('express');
const { db } = require('../lib/firebaseAdmin');
const { requireAuth, requireAdmin } = require('../middleware/auth');

const router = express.Router();
router.use(requireAuth, requireAdmin);

router.get('/stats', async (req, res) => {
  try {
    const [usersSnap, ticketsSnap] = await Promise.all([
      db.collection('users').count().get(),
      db.collection('tickets').count().get(),
    ]);
    const allTickets = await db.collection('tickets').get();
    const totalRevenue = allTickets.docs.reduce((sum, d) => sum + (d.data().fare || 0), 0);

    res.json({
      totalUsers: usersSnap.data().count,
      totalTickets: ticketsSnap.data().count,
      totalRevenue,
    });
  } catch (err) {
    console.error('admin stats error', err);
    res.status(500).json({ error: 'Could not load stats' });
  }
});

module.exports = router;