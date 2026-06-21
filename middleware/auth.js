const authenticate = require('./verifyFirebaseToken');
const isAdmin = require('./requireAdmin');

module.exports = { authenticate, isAdmin };
