const bookingService = require('../src/services/bookingService');
const { sequelize, Property, Booking } = require('./setup');

describe('Booking Service Unit', () => {
  beforeEach(async () => {
    await Booking.destroy({ where: {} });
  });

  it('should create a booking with valid data', async () => {
    const booking = await bookingService.createBooking({
      property_id: 1,
      user_name: 'UnitTest',
      start_date: '2025-08-12',
      end_date: '2025-08-13',
    });
    expect(booking).toBeDefined();
    expect(booking.user_name).toBe('UnitTest');
  });

  it('should not allow overlapping bookings', async () => {
    await bookingService.createBooking({
      property_id: 1,
      user_name: 'UnitTest',
      start_date: '2025-08-14',
      end_date: '2025-08-16',
    });
    await expect(
      bookingService.createBooking({
        property_id: 1,
        user_name: 'UnitTest2',
        start_date: '2025-08-15',
        end_date: '2025-08-17',
      })
    ).rejects.toThrow(/overlap/);
  });
});
