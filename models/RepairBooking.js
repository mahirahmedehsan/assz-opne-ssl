const mongoose = require('mongoose');

const repairBookingSchema = new mongoose.Schema({
  ticketNumber: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  customer: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: String,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    default: null,
  },
  deviceModel: { type: String, required: true },
  deviceType: {
    type: String,
    required: true,
  },
  services: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'RepairService',
  }],
  issueDescription: String,
  preferredDate: { type: Date, required: true },
  preferredSlot: {
    type: String,
    enum: ['morning', 'afternoon', 'evening'],
    required: true,
  },
  status: {
    type: String,
    enum: ['pending', 'diagnosed', 'in_repair', 'ready', 'delivered', 'cancelled'],
    default: 'pending',
  },
  estimatedCost: { type: Number, default: 0 },
  finalCost: Number,
  notes: String,
}, { timestamps: true });

module.exports = mongoose.model('RepairBooking', repairBookingSchema);
