const sequelize = require('../src/db');
const Property = require('../src/models.property');
const Booking = require('../src/models.booking');

beforeAll(async () => {
  await sequelize.sync({ force: true });
  await Property.bulkCreate([
    {
      id: 1,
      title: 'Cozy Cabin',
      description: 'A nice cabin in the woods',
      price_per_night: 100,
      available_from: '2025-08-10',
      available_to: '2025-08-20',
    },
    {
      id: 2,
      title: 'Beach House',
      description: 'On the beach!',
      price_per_night: 200,
      available_from: '2025-08-15',
      available_to: '2025-08-25',
    },
  ]);
});

module.exports = { sequelize, Property, Booking };
