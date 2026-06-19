const { isInitialized, getAuth } = require('../config/firebaseAdmin');
const User = require('../models/User');

const optionalAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    req.user = null;
    return next();
  }

  if (!isInitialized()) {
    req.user = null;
    return next();
  }

  const token = authHeader.split('Bearer ')[1];
  try {
    const auth = getAuth();
    if (!auth) { req.user = null; return next(); }
    const decoded = await auth.verifyIdToken(token);
    let user = await User.findOne({ firebaseUid: decoded.uid });
    if (!user && decoded.email) {
      user = await User.findOne({ email: decoded.email });
      if (user) {
        user.firebaseUid = decoded.uid;
        await user.save();
      }
    }
    if (user) {
      req.user = { ...user.toObject(), _id: user._id, role: user.role };
    } else {
      req.user = null;
    }
  } catch {
    req.user = null;
  }
  next();
};

module.exports = optionalAuth;
