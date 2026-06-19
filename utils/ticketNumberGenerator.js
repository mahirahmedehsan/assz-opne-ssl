const RepairBooking = require('../models/RepairBooking');

const generateTicketNumber = async () => {
  const year = new Date().getFullYear();
  const count = await RepairBooking.countDocuments();
  const seq = String(count + 1).padStart(5, '0');
  return `ASSZ-${year}-${seq}`;
};

module.exports = generateTicketNumber;
