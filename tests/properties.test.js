const request = require('supertest');
const express = require('express');
const propertiesRouter = require('../src/routes.properties');
const { sequelize } = require('./setup');

const app = express();
app.use(express.json());
app.use('/properties', propertiesRouter);

describe('GET /properties', () => {
  it('should list all properties', async () => {
    const res = await request(app).get('/properties');
    expect(res.statusCode).toBe(200);
    expect(res.body.properties.length).toBeGreaterThan(0);
  });
});

describe('GET /properties/:id/availability', () => {
  it('should show availability for a property', async () => {
    const res = await request(app).get('/properties/1/availability');
    expect(res.statusCode).toBe(200);
    expect(res.body.property_id).toBe(1);
    expect(Array.isArray(res.body.available)).toBe(true);
  });
});
