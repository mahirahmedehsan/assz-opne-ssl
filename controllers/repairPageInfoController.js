const RepairPageInfo = require('../models/RepairPageInfo');

const get = async (req, res) => {
  try {
    let info = await RepairPageInfo.findOne();
    if (!info) {
      info = await RepairPageInfo.create({});
    }
    res.json({ repairPageInfo: info });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    let info = await RepairPageInfo.findOne();
    if (!info) {
      info = await RepairPageInfo.create(req.body);
    } else {
      Object.assign(info, req.body);
      await info.save();
    }
    res.json({ repairPageInfo: info });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { get, update };
