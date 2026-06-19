const RepairBooking = require('../models/RepairBooking');
const generateTicketNumber = require('../utils/ticketNumberGenerator');

const create = async (req, res) => {
  try {
    const { customer, deviceModel, deviceType, preferredDate, preferredSlot } = req.body;
    if (!customer?.name || !customer?.phone) return res.status(400).json({ error: 'Customer name and phone are required' });
    if (!deviceModel) return res.status(400).json({ error: 'Device model is required' });
    if (!deviceType) return res.status(400).json({ error: 'Device type is required' });
    if (!preferredDate) return res.status(400).json({ error: 'Preferred date is required' });
    if (!preferredSlot) return res.status(400).json({ error: 'Preferred time slot is required' });

    const ticketNumber = await generateTicketNumber();
    const booking = await RepairBooking.create({
      ...req.body,
      ticketNumber,
      user: req.user?._id || null,
    });
    res.status(201).json({ booking });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const createGuest = async (req, res) => {
  try {
    const { customer, deviceModel, deviceType, preferredDate, preferredSlot } = req.body;
    if (!customer?.name || !customer?.phone) return res.status(400).json({ error: 'Customer name and phone are required' });
    if (!deviceModel) return res.status(400).json({ error: 'Device model is required' });
    if (!deviceType) return res.status(400).json({ error: 'Device type is required' });
    if (!preferredDate) return res.status(400).json({ error: 'Preferred date is required' });
    if (!preferredSlot) return res.status(400).json({ error: 'Preferred time slot is required' });

    const ticketNumber = await generateTicketNumber();
    const booking = await RepairBooking.create({
      ...req.body,
      ticketNumber,
      user: null,
    });
    res.status(201).json({ booking });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const track = async (req, res) => {
  try {
    const { ticketId } = req.params;
    const { phone } = req.query;

    const booking = await RepairBooking.findOne({ ticketNumber: ticketId }).populate('services');

    if (!booking) return res.status(404).json({ error: 'Booking not found' });

    if (phone && booking.customer.phone !== phone) {
      return res.status(403).json({ error: 'Phone number does not match this booking' });
    }

    res.json({ booking });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const adminList = async (req, res) => {
  try {
    const { status, page = 1, limit = 20 } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const skip = (Number(page) - 1) * Number(limit);
    const [bookings, total] = await Promise.all([
      RepairBooking.find(filter)
        .populate('services')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      RepairBooking.countDocuments(filter),
    ]);

    res.json({
      bookings,
      pagination: { page: Number(page), limit: Number(limit), total, pages: Math.ceil(total / Number(limit)) },
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update = async (req, res) => {
  try {
    const booking = await RepairBooking.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    res.json({ booking });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = { create, createGuest, track, adminList, update };
