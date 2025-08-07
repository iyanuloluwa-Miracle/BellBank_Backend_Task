const express = require('express');
const { body } = require('express-validator');
const { createBooking, deleteBooking, updateBooking } = require('../controllers/bookingController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Bookings
 *   description: Booking management
 */

/**
 * @swagger
 * /bookings:
 *   post:
 *     summary: Create a booking
 *     tags: [Bookings]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - property_id
 *               - user_name
 *               - start_date
 *               - end_date
 *             properties:
 *               property_id:
 *                 type: integer
 *               user_name:
 *                 type: string
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Booking created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Booking'
 *       400:
 *         description: Invalid input or overlap
 *
 * /bookings/{id}:
 *   delete:
 *     summary: Cancel a booking
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking cancelled
 *       404:
 *         description: Booking not found
 *   put:
 *     summary: Update a booking
 *     tags: [Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Booking ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               start_date:
 *                 type: string
 *                 format: date
 *               end_date:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Booking updated
 *       400:
 *         description: Invalid input or overlap
 *       404:
 *         description: Booking not found
 */

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
