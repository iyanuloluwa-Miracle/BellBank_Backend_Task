const { Op } = require('sequelize');
const { Property, Booking } = require('../db');

async function listProperties({ page = 1, limit = 10, available_from, available_to }) {
  const where = {};
  if (available_from && available_to) {
    where.available_from = { [Op.lte]: available_from };
    where.available_to = { [Op.gte]: available_to };
  }
  const properties = await Property.findAndCountAll({
    where,
    offset: (page - 1) * limit,
    limit: parseInt(limit),
    order: [['id', 'ASC']],
  });
  return {
    total: properties.count,
    page: parseInt(page),
    pageSize: parseInt(limit),
    properties: properties.rows,
  };
}

async function getPropertyAvailability(propertyId) {
  const property = await Property.findByPk(propertyId);
  if (!property) return null;
  const bookings = await Booking.findAll({
    where: { property_id: property.id },
    order: [['start_date', 'ASC']],
  });
  const available = [];
  let current = new Date(property.available_from);
  const end = new Date(property.available_to);
  for (const booking of bookings) {
    const bStart = new Date(booking.start_date);
    if (current < bStart) {
      available.push({ from: current.toISOString().slice(0,10), to: new Date(bStart - 1).toISOString().slice(0,10) });
    }
    current = new Date(booking.end_date);
    current.setDate(current.getDate() + 1);
  }
  if (current <= end) {
    available.push({ from: current.toISOString().slice(0,10), to: end.toISOString().slice(0,10) });
  }
  return { property_id: property.id, available };
}

module.exports = { listProperties, getPropertyAvailability };
