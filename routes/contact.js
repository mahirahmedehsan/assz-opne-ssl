const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');
const verifyFirebaseToken = require('../middleware/verifyFirebaseToken');
const requireAdmin = require('../middleware/requireAdmin');

router.post('/', async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;
    if (!name || !email || !message) return res.status(400).json({ error: 'Name, email, and message are required' });
    const contact = await Contact.create({ name, email, phone, subject, message });
    res.status(201).json({ message: 'Message sent successfully', contact });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/admin', verifyFirebaseToken, requireAdmin, async (req, res) => {
  try {
    const messages = await Contact.find().sort({ createdAt: -1 });
    res.json({ messages });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id/read', verifyFirebaseToken, requireAdmin, async (req, res) => {
  try {
    const contact = await Contact.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
    res.json({ contact });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
