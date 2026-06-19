const { isInitialized, getAuth } = require('../config/firebaseAdmin');
const User = require('../models/User');

const verifyFirebaseToken = async (req, res, next) => {
  if (!isInitialized()) {
    return res.status(503).json({ error: 'Firebase auth not configured on server' });
  }

  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'No token provided' });
  }

  const token = authHeader.split('Bearer ')[1];

  try {
    const auth = getAuth();
    if (!auth) return res.status(503).json({ error: 'Firebase auth not configured' });
    const decoded = await auth.verifyIdToken(token);
    const firebaseUid = decoded.uid;

    let user = await User.findOne({ firebaseUid });

    if (!user) {
      user = await User.findOne({ email: decoded.email });
      if (user) {
        user.firebaseUid = firebaseUid;
        await user.save();
      } else {
        user = await User.create({
          firebaseUid,
          name: decoded.name || decoded.email?.split('@')[0] || 'User',
          email: decoded.email || '',
          photoURL: decoded.picture || '',
        });
      }
    }

    req.user = {
      ...user.toObject(),
      _id: user._id,
      firebaseUid: user.firebaseUid,
      role: user.role,
    };

    next();
  } catch (error) {
    console.error('Token verification error:', error.message);
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

module.exports = verifyFirebaseToken;
