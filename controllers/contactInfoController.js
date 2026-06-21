const ContactInfo = require('../models/ContactInfo');

const get = async (req, res) => {
  try {
    let info = await ContactInfo.findOne();
    if (!info) {
      info = await ContactInfo.create({});
    }
    res.json({ contactInfo: info });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    let info = await ContactInfo.findOne();
    if (!info) {
      info = await ContactInfo.create(req.body);
    } else {
      Object.assign(info, req.body);
      await info.save();
    }
    res.json({ contactInfo: info });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { get, update };
