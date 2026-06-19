const Review = require('../models/Review');
const Product = require('../models/Product');

const create = async (req, res) => {
  try {
    const { targetType, targetId, rating, comment } = req.body;

    const existing = await Review.findOne({ targetType, targetId, user: req.user._id });
    if (existing) return res.status(400).json({ error: 'You have already reviewed this item' });

    const review = await Review.create({
      targetType,
      targetId,
      user: req.user._id,
      rating,
      comment,
    });

    const stats = await Review.aggregate([
      { $match: { targetType, targetId: review.targetId, isApproved: true } },
      { $group: { _id: null, avg: { $avg: '$rating' }, count: { $sum: 1 } } },
    ]);

    if (targetType === 'product' && stats.length > 0) {
      await Product.findByIdAndUpdate(targetId, {
        ratingAvg: Math.round(stats[0].avg * 10) / 10,
        ratingCount: stats[0].count,
      });
    }

    res.status(201).json({ review });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const listForTarget = async (req, res) => {
  try {
    const { targetType, targetId } = req.params;
    const reviews = await Review.find({ targetType, targetId, isApproved: true })
      .populate('user', 'name photoURL')
      .sort({ createdAt: -1 });
    res.json({ reviews });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const listAll = async (req, res) => {
  try {
    const reviews = await Review.find({ isApproved: true })
      .populate('user', 'name photoURL')
      .sort({ createdAt: -1 });
    res.json({ reviews });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const adminList = async (req, res) => {
  try {
    const reviews = await Review.find()
      .populate('user', 'name email')
      .sort({ createdAt: -1 });
    res.json({ reviews });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!review) return res.status(404).json({ error: 'Review not found' });

    if (review.targetType === 'product') {
      const stats = await Review.aggregate([
        { $match: { targetType: review.targetType, targetId: review.targetId, isApproved: true } },
        { $group: { _id: null, avg: { $avg: '$rating' }, count: { $sum: 1 } } },
      ]);
      await Product.findByIdAndUpdate(review.targetId, {
        ratingAvg: stats.length > 0 ? Math.round(stats[0].avg * 10) / 10 : 0,
        ratingCount: stats.length > 0 ? stats[0].count : 0,
      });
    }

    res.json({ review });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ error: 'Review not found' });

    if (review.targetType === 'product') {
      const stats = await Review.aggregate([
        { $match: { targetType: review.targetType, targetId: review.targetId, isApproved: true } },
        { $group: { _id: null, avg: { $avg: '$rating' }, count: { $sum: 1 } } },
      ]);
      await Product.findByIdAndUpdate(review.targetId, {
        ratingAvg: stats.length > 0 ? Math.round(stats[0].avg * 10) / 10 : 0,
        ratingCount: stats.length > 0 ? stats[0].count : 0,
      });
    }

    res.json({ message: 'Review deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { create, listAll, listForTarget, adminList, update, remove };
