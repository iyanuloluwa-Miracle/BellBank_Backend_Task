const getSequelizeInstance = require('../config/database');
const PropertyModel = require('../models/property');
const BookingModel = require('../models/booking');

const sequelize = getSequelizeInstance();

const Property = PropertyModel(sequelize);
const Booking = BookingModel(sequelize);

Property.hasMany(Booking, { foreignKey: 'property_id' });
Booking.belongsTo(Property, { foreignKey: 'property_id' });

module.exports = {
  sequelize,
  Property,
  Booking,
};
