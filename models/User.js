const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
  label: { type: String, default: 'Home' },
  address: String,
  city: String,
  phone: String,
}, { _id: false });

const userSchema = new mongoose.Schema({
  firebaseUid: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: String,
  address: String,
  photoURL: String,
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer',
  },
  addresses: [addressSchema],
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);
