const mongoose = require('mongoose');

const socialMediaSchema = new mongoose.Schema({
  platform: {
    type: String,
    required: true,
    enum: ['youtube', 'tiktok', 'instagram', 'facebook'],
  },
  url: { type: String, required: true },
  embedUrl: { type: String },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  thumbnail: { type: String, default: '' },
  isFeatured: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  order: { type: Number, default: 0 },
}, { timestamps: true });

module.exports = mongoose.model('SocialMedia', socialMediaSchema);
