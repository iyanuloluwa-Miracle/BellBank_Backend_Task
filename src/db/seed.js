const { Property } = require('./index');

async function seedProperties() {
  const count = await Property.count();
  if (count === 0) {
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
    console.log('Seeded properties table.');
  } else {
    console.log('Properties table already seeded.');
  }
}

module.exports = seedProperties;
