const RepairService = require('../models/RepairService');

const list = async (req, res) => {
  try {
    const { deviceType, category } = req.query;
    const filter = { isActive: true };
    if (deviceType) filter.deviceType = deviceType;
    if (category) filter.category = category;
    const services = await RepairService.find(filter).sort({ category: 1, deviceType: 1 });
    res.json({ services });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create = async (req, res) => {
  try {
    const service = await RepairService.create(req.body);
    res.status(201).json({ service });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const service = await RepairService.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!service) return res.status(404).json({ error: 'Repair service not found' });
    res.json({ service });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const remove = async (req, res) => {
  try {
    await RepairService.findByIdAndDelete(req.params.id);
    res.json({ message: 'Repair service deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { list, create, update, remove };
