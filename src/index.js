const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const propertiesRouter = require('./routes/properties');
const bookingsRouter = require('./routes/bookings');
const { sequelize } = require('./db');
const errorHandler = require('./middleware/errorHandler');
require('dotenv').config();

const app = express();
app.use(express.json());

app.use('/properties', propertiesRouter);
app.use('/bookings', bookingsRouter);

const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Booking API',
      version: '1.0.0',
      description: 'API documentation for the Booking property rental platform',
    },
    servers: [
      { url: 'http://localhost:' + (process.env.PORT || 3000) }
    ],
  },
  apis: ['./src/routes/*.js', './src/models/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

const PORT = process.env.PORT || 3000;

sequelize.authenticate()
  .then(() => sequelize.sync())
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((e) => {
    console.error('Unable to connect to the database:', e);
  });
