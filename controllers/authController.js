const User = require('../models/User');

const syncUser = async (req, res) => {
  try {
    const { name, email, phone, photoURL } = req.body;
    const firebaseUid = req.user.firebaseUid;

    let user = await User.findOne({ firebaseUid });
    if (!user) {
      user = await User.findOne({ email });
      if (user) {
        user.firebaseUid = firebaseUid;
      }
    }

    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      if (phone) user.phone = phone;
      if (photoURL) user.photoURL = photoURL;
      await user.save();
    } else {
      user = await User.create({ firebaseUid, name, email, phone, photoURL });
    }

    res.json({ user });
  } catch (error) {
    console.error('Auth sync error:', error);
    res.status(500).json({ error: 'Failed to sync user' });
  }
};

module.exports = { syncUser };
