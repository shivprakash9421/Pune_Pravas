const { auth } = require('../lib/firebaseAdmin');

// Verifies "Authorization: Bearer <Firebase ID token>" and attaches the
// decoded, verified token to req.user. Never trust anything the client
// sends about who it is — only this.
async function requireAuth(req, res, next) {
  const header = req.headers.authorization || '';
  const token = header.startsWith('Bearer ') ? header.slice(7) : null;

  if (!token) {
    return res.status(401).json({ error: 'Missing Authorization header' });
  }

  try {
    req.user = await auth.verifyIdToken(token);
    next();
  } catch (err) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
}

// Use after requireAuth. Reads the custom claim, not anything client-supplied.
function requireAdmin(req, res, next) {
  if (req.user?.admin === true || req.user?.role === 'admin') {
    return next();
  }
  return res.status(403).json({ error: 'Admin access required' });
}

module.exports = { requireAuth, requireAdmin };