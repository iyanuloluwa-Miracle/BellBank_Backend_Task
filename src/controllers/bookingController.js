const bookingService = require('../services/bookingService');

async function createBooking(req, res, next) {
  try {
    const { property_id, user_name, start_date, end_date } = req.body;
    const booking = await bookingService.createBooking({ property_id, user_name, start_date, end_date });
    res.status(201).json(booking);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

async function deleteBooking(req, res, next) {
  try {
    await bookingService.deleteBooking(req.params.id);
    res.json({ message: 'Booking cancelled' });
  } catch (e) {
    res.status(404).json({ error: e.message });
  }
}

async function updateBooking(req, res, next) {
  try {
    const booking = await bookingService.updateBooking(req.params.id, req.body);
    res.json(booking);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

module.exports = { createBooking, deleteBooking, updateBooking };
