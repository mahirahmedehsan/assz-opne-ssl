const AboutInfo = require('../models/AboutInfo');

const get = async (req, res) => {
  try {
    let info = await AboutInfo.findOne();
    if (!info) {
      info = await AboutInfo.create({});
    }
    res.json({ aboutInfo: info });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    let info = await AboutInfo.findOne();
    if (!info) {
      info = await AboutInfo.create(req.body);
    } else {
      Object.assign(info, req.body);
      await info.save();
    }
    res.json({ aboutInfo: info });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { get, update };
