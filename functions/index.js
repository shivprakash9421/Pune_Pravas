const { setGlobalOptions } = require('firebase-functions/v2');
const { onRequest } = require('firebase-functions/v2/https');

// Set deployment region globally (Do not change)
setGlobalOptions({ region: 'asia-south1' });

// Import Service Modules
const authService = require('./src/services/auth.service');
const userService = require('./src/services/user.service');

// 1. Auth & Admin Services
exports.bootstrapAdmin = authService.bootstrapAdmin;

// 2. User Services
exports.createUserProfile = userService.createUserProfile;
exports.updatePreferences = userService.updatePreferences;
exports.me = userService.me;

// 3. System Endpoints
exports.health = onRequest((req, res) => {
  res.status(200).json({ status: 'OK', service: 'MobilityOS API Gateway' });
});

// Note: Admin dashboard & API keys, Bookings, Wallet, and Maps will be added here next.