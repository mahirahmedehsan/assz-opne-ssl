const mongoose = require('mongoose');

const contactInfoSchema = new mongoose.Schema({
  address: { type: String, default: 'A.K Zaman Plaza, Ataikula, Pabna, Bangladesh' },
  phone: { type: String, default: '+880 1700-000000' },
  email: { type: String, default: 'info@assz.com' },
  whatsapp: { type: String, default: '8801700000000' },
  weekdayLabel: { type: String, default: 'Saturday – Thursday' },
  weekdayHours: { type: String, default: '10:00 AM – 8:00 PM' },
  fridayLabel: { type: String, default: 'Friday' },
  fridayHours: { type: String, default: 'Closed' },
  mapLink: { type: String, default: 'https://maps.google.com/?q=A.K+Zaman+Plaza+Ataikula+Pabna' },
}, { timestamps: true });

module.exports = mongoose.model('ContactInfo', contactInfoSchema);
