const { Op } = require('sequelize');
const { Booking, Property } = require('../db');

async function createBooking({ property_id, user_name, start_date, end_date }) {
  if (start_date >= end_date) throw new Error('start_date must be before end_date');
  const property = await Property.findByPk(property_id);
  if (!property) throw new Error('Property not found');
  if (start_date < property.available_from || end_date > property.available_to) {
    throw new Error('Booking dates outside property availability');
  }
  const overlap = await Booking.findOne({
    where: {
      property_id,
      [Op.or]: [
        { start_date: { [Op.between]: [start_date, end_date] } },
        { end_date: { [Op.between]: [start_date, end_date] } },
        { start_date: { [Op.lte]: start_date }, end_date: { [Op.gte]: end_date } },
      ],
    },
  });
  if (overlap) throw new Error('Booking dates overlap with existing booking');
  return Booking.create({ property_id, user_name, start_date, end_date });
}

async function deleteBooking(id) {
  const booking = await Booking.findByPk(id);
  if (!booking) throw new Error('Booking not found');
  await booking.destroy();
  return true;
}

async function updateBooking(id, { start_date, end_date }) {
  const booking = await Booking.findByPk(id);
  if (!booking) throw new Error('Booking not found');
  let newStart = start_date || booking.start_date;
  let newEnd = end_date || booking.end_date;
  if (newStart >= newEnd) throw new Error('start_date must be before end_date');
  const property = await Property.findByPk(booking.property_id);
  if (newStart < property.available_from || newEnd > property.available_to) {
    throw new Error('Booking dates outside property availability');
  }
  const overlap = await Booking.findOne({
    where: {
      property_id: booking.property_id,
      id: { [Op.ne]: booking.id },
      [Op.or]: [
        { start_date: { [Op.between]: [newStart, newEnd] } },
        { end_date: { [Op.between]: [newStart, newEnd] } },
        { start_date: { [Op.lte]: newStart }, end_date: { [Op.gte]: newEnd } },
      ],
    },
  });
  if (overlap) throw new Error('Booking dates overlap with existing booking');
  booking.start_date = newStart;
  booking.end_date = newEnd;
  await booking.save();
  return booking;
}

module.exports = { createBooking, deleteBooking, updateBooking };
