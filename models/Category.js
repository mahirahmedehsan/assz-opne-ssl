const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true, index: true },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    default: null,
  },
  icon: String,
  type: {
    type: String,
    enum: ['product', 'repair'],
    default: 'product',
  },
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
