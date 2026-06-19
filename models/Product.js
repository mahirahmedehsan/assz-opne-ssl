const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  },
  brand: String,
  price: { type: Number, required: true },
  discountPrice: Number,
  stock: { type: Number, default: 0 },
  description: String,
  images: [String],
  specs: { type: Map, of: String },
  isSecondHand: { type: Boolean, default: false },
  condition: {
    type: String,
    enum: ['new', 'used', 'refurbished'],
    default: 'new',
  },
  ratingAvg: { type: Number, default: 0 },
  ratingCount: { type: Number, default: 0 },
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
}, { timestamps: true });

productSchema.index({ category: 1 });
productSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Product', productSchema);
