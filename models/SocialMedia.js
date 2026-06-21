const mongoose = require('mongoose');

const socialMediaSchema = new mongoose.Schema({
  platform: {
    type: String,
    enum: ['youtube', 'tiktok', 'instagram', 'facebook'],
    required: true,
  },
  url: { type: String, required: true },
  embedUrl: { type: String, required: true },
  title: { type: String, default: '' },
  description: { type: String, default: '' },
  thumbnail: { type: String, default: '' },
  isFeatured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('SocialMedia', socialMediaSchema);
