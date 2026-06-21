const mongoose = require('mongoose');

const daySchema = new mongoose.Schema({
  day: { type: String, required: true },
  isOpen: { type: Boolean, default: true },
  hours: { type: String, default: '' },
}, { _id: false });

const contactInfoSchema = new mongoose.Schema({
  address: { type: String, default: 'A.K Zaman Plaza, Ataikula, Pabna, Bangladesh' },
  phone: { type: String, default: '+880 1700-000000' },
  email: { type: String, default: 'info@assz.com' },
  whatsapp: { type: String, default: '8801700000000' },
  days: {
    type: [daySchema],
    default: () => [
      { day: 'Saturday', isOpen: true, hours: '10:00 AM – 8:00 PM' },
      { day: 'Sunday', isOpen: true, hours: '10:00 AM – 8:00 PM' },
      { day: 'Monday', isOpen: true, hours: '10:00 AM – 8:00 PM' },
      { day: 'Tuesday', isOpen: true, hours: '10:00 AM – 8:00 PM' },
      { day: 'Wednesday', isOpen: true, hours: '10:00 AM – 8:00 PM' },
      { day: 'Thursday', isOpen: true, hours: '10:00 AM – 8:00 PM' },
      { day: 'Friday', isOpen: false, hours: 'Closed' },
    ],
  },
  mapLink: { type: String, default: 'https://maps.google.com/?q=A.K+Zaman+Plaza+Ataikula+Pabna' },
}, { timestamps: true });

module.exports = mongoose.model('ContactInfo', contactInfoSchema);
