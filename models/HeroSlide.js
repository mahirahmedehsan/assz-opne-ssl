const mongoose = require('mongoose');

const heroSlideSchema = new mongoose.Schema({
  badge: { type: String, default: '' },
  titleLine1: { type: String, required: true },
  titleLine2: { type: String, default: '' },
  accent: { type: String, default: '' },
  accentColor: {
    type: String,
    default: 'text-accent',
  },
  description: { type: String, default: '' },
  primaryText: { type: String, default: 'Book a Repair' },
  primaryHref: { type: String, default: '/repair-services' },
  secondaryText: { type: String, default: 'Shop Accessories' },
  secondaryHref: { type: String, default: '/shop' },
  image: { type: String, default: '' },
  gradient: { type: String, default: 'from-[#0B1121] via-[#0F1629] to-[#1A1B3A]' },
  glow: { type: String, default: 'from-accent' },
  order: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('HeroSlide', heroSlideSchema);
