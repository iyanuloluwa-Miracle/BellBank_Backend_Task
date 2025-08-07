const express = require('express');
const { getProperties, getPropertyAvailability } = require('../controllers/propertyController');

const router = express.Router();

router.get('/', getProperties);
router.get('/:id/availability', getPropertyAvailability);

module.exports = router;
