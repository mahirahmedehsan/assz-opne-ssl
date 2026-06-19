const HeroSlide = require('../models/HeroSlide');

const listActive = async (req, res) => {
  try {
    const slides = await HeroSlide.find({ isActive: true }).sort({ order: 1 });
    res.json({ slides });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const adminList = async (req, res) => {
  try {
    const slides = await HeroSlide.find().sort({ order: 1 });
    res.json({ slides });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const maxOrder = await HeroSlide.findOne().sort({ order: -1 }).select('order');
    const slide = await HeroSlide.create({
      ...req.body,
      order: (maxOrder?.order ?? -1) + 1,
    });
    res.status(201).json({ slide });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const slide = await HeroSlide.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!slide) return res.status(404).json({ error: 'Hero slide not found' });
    res.json({ slide });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    const slide = await HeroSlide.findByIdAndDelete(req.params.id);
    if (!slide) return res.status(404).json({ error: 'Hero slide not found' });
    res.json({ message: 'Hero slide deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const reorder = async (req, res) => {
  try {
    const { ids } = req.body;
    if (!Array.isArray(ids)) return res.status(400).json({ error: 'ids must be an array' });
    for (let i = 0; i < ids.length; i++) {
      await HeroSlide.findByIdAndUpdate(ids[i], { order: i });
    }
    res.json({ message: 'Reorder successful' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { listActive, adminList, create, update, remove, reorder };
