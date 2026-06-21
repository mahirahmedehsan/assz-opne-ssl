const mongoose = require('mongoose');

const statSchema = new mongoose.Schema({
  value: { type: String, default: '' },
  label: { type: String, default: '' },
}, { _id: false });

const valueSchema = new mongoose.Schema({
  title: { type: String, default: '' },
  desc: { type: String, default: '' },
  icon: { type: String, default: '' },
}, { _id: false });

const timelineSchema = new mongoose.Schema({
  year: { type: String, default: '' },
  event: { type: String, default: '' },
}, { _id: false });

const teamSchema = new mongoose.Schema({
  name: { type: String, default: '' },
  role: { type: String, default: '' },
  initials: { type: String, default: '' },
}, { _id: false });

const aboutInfoSchema = new mongoose.Schema({
  heroTitle: { type: String, default: "Pabna's Most Trusted Apple Device Service Center" },
  heroDescription: { type: String, default: "We're a team of passionate technicians, retailers, and customer service professionals dedicated to keeping Apple devices running at their best." },
  stats: {
    type: [statSchema],
    default: () => [
      { value: '5+', label: 'Years Experience' },
      { value: '2,000+', label: 'Devices Repaired' },
      { value: '98%', label: 'Customer Satisfaction' },
      { value: '90-Day', label: 'Warranty on All Repairs' },
    ],
  },
  missionTitle: { type: String, default: 'Our Mission' },
  missionDescription: { type: String, default: 'To provide fast, reliable, and affordable Apple device service with the transparency and precision of a professional workshop — right here in Pabna.' },
  values: {
    type: [valueSchema],
    default: () => [
      { title: 'Quality Parts', desc: 'We use genuine or high-grade replacement parts sourced from trusted suppliers.', icon: '🛡️' },
      { title: 'Certified Technicians', desc: 'Every repair is performed by trained professionals with years of hands-on experience.', icon: '🔧' },
      { title: 'Transparent Pricing', desc: 'You get a detailed quote before any work begins. No hidden fees, no surprises.', icon: '💰' },
      { title: 'Fast Service', desc: 'Most repairs completed within 24 hours. Same-day service available for common issues.', icon: '⚡' },
    ],
  },
  timeline: {
    type: [timelineSchema],
    default: () => [
      { year: '2019', event: 'ASSZ founded in Pabna with a single repair bench' },
      { year: '2020', event: 'Expanded to accessories retail; launched online presence' },
      { year: '2021', event: 'Became authorized service partner for major brands' },
      { year: '2023', event: 'Opened second location; 2,000+ devices served' },
      { year: '2025', event: 'Launched full e-commerce platform with nationwide delivery' },
    ],
  },
  team: {
    type: [teamSchema],
    default: () => [
      { name: 'Mahir Ahmed Ehsan', role: 'Founder & Lead Technician', initials: 'ME' },
      { name: 'Fatima Akter', role: 'Customer Relations Manager', initials: 'FA' },
      { name: 'Rakib Hasan', role: 'Senior Repair Technician', initials: 'RH' },
      { name: 'Nusrat Jahan', role: 'Sales & Inventory Lead', initials: 'NJ' },
    ],
  },
  ctaTitle: { type: String, default: 'Ready to Get Started?' },
  ctaDescription: { type: String, default: 'Book a repair, shop accessories, or just stop by for a free diagnostic.' },
  ctaPrimaryLabel: { type: String, default: 'Book a Repair' },
  ctaPrimaryLink: { type: String, default: '/repair-services' },
  ctaSecondaryLabel: { type: String, default: 'Visit Our Store' },
  ctaSecondaryLink: { type: String, default: '/contact' },
}, { timestamps: true });

module.exports = mongoose.model('AboutInfo', aboutInfoSchema);
