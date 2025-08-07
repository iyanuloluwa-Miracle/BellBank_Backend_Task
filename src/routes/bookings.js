const express = require('express');
const { body } = require('express-validator');
const { createBooking, deleteBooking, updateBooking } = require('../controllers/bookingController');

const router = express.Router();

router.post(
  '/',
  [
    body('property_id').isInt(),
    body('user_name').isString().notEmpty(),
    body('start_date').isISO8601(),
    body('end_date').isISO8601(),
  ],
  createBooking
);

router.delete('/:id', deleteBooking);

router.put(
  '/:id',
  [
    body('start_date').optional().isISO8601(),
    body('end_date').optional().isISO8601(),
  ],
  updateBooking
);

module.exports = router;
