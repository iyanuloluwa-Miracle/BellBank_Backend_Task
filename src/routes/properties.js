const express = require('express');
const { getProperties, getPropertyAvailability } = require('../controllers/propertyController');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Properties
 *   description: Property management
 */

/**
 * @swagger
 * /properties:
 *   get:
 *     summary: Get all properties
 *     tags: [Properties]
 *     responses:
 *       200:
 *         description: List of properties
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                 page:
 *                   type: integer
 *                 pageSize:
 *                   type: integer
 *                 properties:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Property'
 */

/**
 * @swagger
 * /properties/{id}/availability:
 *   get:
 *     summary: Get property availability
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Property ID
 *     responses:
 *       200:
 *         description: Availability info
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 property_id:
 *                   type: integer
 *                 available:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       from:
 *                         type: string
 *                         format: date
 *                       to:
 *                         type: string
 *                         format: date
 */

router.get('/', getProperties);
router.get('/:id/availability', getPropertyAvailability);

module.exports = router;
