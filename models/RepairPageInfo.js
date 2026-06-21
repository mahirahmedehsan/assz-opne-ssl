const mongoose = require('mongoose');

const deviceTypeSchema = new mongoose.Schema({
  value: { type: String, default: '' },
  label: { type: String, default: '' },
}, { _id: false });

const timeSlotSchema = new mongoose.Schema({
  value: { type: String, default: '' },
  label: { type: String, default: '' },
}, { _id: false });

const repairPageInfoSchema = new mongoose.Schema({
  heroBadge: { type: String, default: 'Free diagnostic \u2022 90-day warranty' },
  heroTitle: { type: String, default: 'Professional Repair<br />Services' },
  heroDescription: { type: String, default: 'Screen repairs, battery replacements, software fixes, and more. Fast turnaround with genuine parts.' },
  servicesTitle: { type: String, default: 'Our Services' },
  servicesDescription: { type: String, default: 'Select your device type to filter available services.' },
  deviceTypes: {
    type: [deviceTypeSchema],
    default: () => [
      { value: 'Android Phone', label: 'Android Phone' },
      { value: 'iPhone', label: 'iPhone' },
      { value: 'iPad', label: 'iPad' },
      { value: 'MacBook', label: 'MacBook' },
      { value: 'Laptop', label: 'Laptop' },
      { value: 'Apple Watch', label: 'Apple Watch' },
      { value: 'AirPods', label: 'AirPods' },
      { value: 'Other', label: 'Other' },
    ],
  },
  timeSlots: {
    type: [timeSlotSchema],
    default: () => [
      { value: 'morning', label: 'Morning (10AM\u201312PM)' },
      { value: 'afternoon', label: 'Afternoon (12PM\u20135PM)' },
      { value: 'evening', label: 'Evening (5PM\u20138PM)' },
    ],
  },
  offlineTitle: { type: String, default: "Don't Want to Book Online?" },
  offlineDescription: { type: String, default: 'Call or visit us directly. We\'re open Saturday\u2013Thursday, 10 AM \u2013 8 PM.' },
  offlinePhone: { type: String, default: '+8801700000000' },
  offlineWhatsapp: { type: String, default: '8801700000000' },
  trackTitle: { type: String, default: 'Track Your Repair' },
  trackDescription: { type: String, default: 'Already booked a repair? Use your ticket number to check the status.' },
  trackLink: { type: String, default: '/track-repair/demo' },
  trackButtonLabel: { type: String, default: 'Track My Repair' },
}, { timestamps: true });

module.exports = mongoose.model('RepairPageInfo', repairPageInfoSchema);
