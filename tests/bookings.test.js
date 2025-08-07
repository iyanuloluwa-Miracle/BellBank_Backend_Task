const request = require('supertest');
const express = require('express');
const bookingsRouter = require('../src/routes.bookings');
const propertiesRouter = require('../src/routes.properties');
const { sequelize, Property, Booking } = require('./setup');

const app = express();
app.use(express.json());
app.use('/properties', propertiesRouter);
app.use('/bookings', bookingsRouter);

describe('POST /bookings', () => {
  it('should create a booking', async () => {
    const res = await request(app)
      .post('/bookings')
      .send({
        property_id: 1,
        user_name: 'Alice',
        start_date: '2025-08-11',
        end_date: '2025-08-12',
      });
    expect(res.statusCode).toBe(201);
    expect(res.body.user_name).toBe('Alice');
  });

  it('should not allow overlapping bookings', async () => {
    await Booking.create({
      property_id: 1,
      user_name: 'Bob',
      start_date: '2025-08-13',
      end_date: '2025-08-15',
    });
    const res = await request(app)
      .post('/bookings')
      .send({
        property_id: 1,
        user_name: 'Charlie',
        start_date: '2025-08-14',
        end_date: '2025-08-16',
      });
    expect(res.statusCode).toBe(400);
    expect(res.body.error).toMatch(/overlap/);
  });
});

describe('DELETE /bookings/:id', () => {
  it('should delete a booking', async () => {
    const booking = await Booking.create({
      property_id: 2,
      user_name: 'Dave',
      start_date: '2025-08-16',
      end_date: '2025-08-17',
    });
    const res = await request(app).delete(`/bookings/${booking.id}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.message).toMatch(/cancelled/);
  });
});
