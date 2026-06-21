const User = require('../models/User');
const { getAuth } = require('../config/firebaseAdmin');

const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    res.json({ user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateMe = async (req, res) => {
  try {
    const allowed = {};
    const { name, phone, address, addresses, photoURL } = req.body;
    if (name !== undefined) allowed.name = name;
    if (phone !== undefined) allowed.phone = phone;
    if (address !== undefined) allowed.address = address;
    if (addresses !== undefined) allowed.addresses = addresses;
    if (photoURL !== undefined) allowed.photoURL = photoURL;
    const user = await User.findByIdAndUpdate(req.user._id, allowed, { new: true, runValidators: true });
    res.json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const adminList = async (req, res) => {
  try {
    const { page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);
    const [users, total] = await Promise.all([
      User.find().sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      User.countDocuments(),
    ]);
    res.json({
      users,
      pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / Number(limit)) },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const adminUpdateUser = async (req, res) => {
  try {
    const allowed = ['name', 'email', 'phone', 'address', 'addresses', 'photoURL', 'role'];
    const data = Object.fromEntries(allowed.filter(k => k in req.body).map(k => [k, req.body[k]]));
    const user = await User.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const adminDeleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const adminCreateUser = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    if (!name || !email) return res.status(400).json({ error: 'Name and email are required' });
    if (!password || password.length < 6) return res.status(400).json({ error: 'Password must be at least 6 characters' });
    const exists = await User.findOne({ email });
    if (exists) return res.status(409).json({ error: 'A user with this email already exists' });

    const auth = getAuth();
    let firebaseUid;
    if (auth) {
      const firebaseUser = await auth.createUser({ email, password, displayName: name });
      firebaseUid = firebaseUser.uid;
    } else {
      firebaseUid = `manual_${Date.now()}`;
    }

    const user = await User.create({ name, email, phone, role: role || 'customer', firebaseUid });
    res.status(201).json({ user });
  } catch (error) {
    if (error.code === 'auth/email-already-exists') {
      return res.status(409).json({ error: 'A user with this email already exists in Firebase' });
    }
    res.status(400).json({ error: error.message });
  }
};

module.exports = { getMe, updateMe, adminList, adminUpdateUser, adminDeleteUser, adminCreateUser };
