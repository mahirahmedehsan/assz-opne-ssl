const Order = require('../models/Order');
const Product = require('../models/Product');
const generateOrderNumber = require('../utils/generateOrderNumber');

const create = async (req, res) => {
  try {
    const { items, shippingAddress, paymentMethod } = req.body;

    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'Order must contain at least one item' });
    }

    let total = 0;
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product) return res.status(400).json({ error: `Product ${item.product} not found` });
      if (product.stock < item.qty) {
        return res.status(400).json({ error: `Insufficient stock for ${product.name}. Available: ${product.stock}` });
      }
      const effectivePrice = product.discountPrice || product.price;
      total += effectivePrice * item.qty;
      item.priceAtPurchase = effectivePrice;
      item.name = product.name;
    }

    const orderNumber = await generateOrderNumber();

    const order = await Order.create({
      orderNumber,
      user: req.user?._id || null,
      items,
      shippingAddress,
      paymentMethod: paymentMethod || 'cod',
      total,
    });

    for (const item of items) {
      await Product.findByIdAndUpdate(item.product, { $inc: { stock: -item.qty } });
    }

    res.status(201).json({ order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('items.product', 'name images price').populate('user', 'name email');
    if (!order) return res.status(404).json({ error: 'Order not found' });

    if (order.user && req.user && order.user.toString() !== req.user._id.toString() && req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Access denied' });
    }

    res.json({ order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const adminList = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.orderStatus = status;

    const skip = (Number(page) - 1) * Number(limit);
    const [orders, total] = await Promise.all([
      Order.find(filter).populate('items.product', 'name images price').populate('user', 'name email').sort({ createdAt: -1 }).skip(skip).limit(Number(limit)),
      Order.countDocuments(filter),
    ]);

    res.json({
      orders,
      pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / Number(limit)) },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const original = await Order.findById(req.params.id);
    if (!original) return res.status(404).json({ error: 'Order not found' });

    const order = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

    if (req.body.orderStatus === 'cancelled' && original.orderStatus !== 'cancelled') {
      for (const item of original.items) {
        await Product.findByIdAndUpdate(item.product, { $inc: { stock: item.qty } });
      }
    }

    res.json({ order });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id })
      .populate('items.product', 'name images price')
      .sort({ createdAt: -1 });
    res.json({ orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { create, getById, adminList, update, getMyOrders };
