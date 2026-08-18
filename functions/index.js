
process.on('uncaughtException', (err) => {
  console.error('Fatal startup error:', err);
  process.exit(1);
});const express = require('express');
const cors = require('cors');
require('./src/lib/firebaseAdmin'); // initializes admin once, shared everywhere

const usersRoutes = require('./src/routes/users.routes');
const ticketsRoutes = require('./src/routes/tickets.routes');
const adminRoutes = require('./src/routes/admin.routes');
const pmpmlRoutes = require('./src/routes/pmpml.routes');

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Pune Pravas Backend is running' });
});

app.use('/users', usersRoutes);
app.use('/tickets', ticketsRoutes);
app.use('/admin', adminRoutes);
app.use('/pmpml', pmpmlRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const mapplsRoutes = require('./src/routes/mappls.routes');
// ...
app.use('/mappls', mapplsRoutes);