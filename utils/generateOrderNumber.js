const Order = require('../models/Order');

const generateOrderNumber = async () => {
  const year = new Date().getFullYear();
  const count = await Order.countDocuments();
  const seq = String(count + 1).padStart(6, '0');
  return `ORD-${year}-${seq}`;
};

module.exports = generateOrderNumber;
