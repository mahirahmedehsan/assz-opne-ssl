const mongoose = require('mongoose');

const repairServiceSchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  deviceType: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: String,
  priceMin: { type: Number, required: true },
  priceMax: { type: Number, required: true },
  estTurnaroundMinutes: { type: Number, default: 60 },
  isActive: { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('RepairService', repairServiceSchema);
