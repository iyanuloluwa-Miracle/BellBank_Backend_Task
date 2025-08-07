const propertyService = require('../services/propertyService');

async function getProperties(req, res, next) {
  try {
    const { page, limit, available_from, available_to } = req.query;
    const result = await propertyService.listProperties({ page, limit, available_from, available_to });
    res.json(result);
  } catch (e) {
    next(e);
  }
}

async function getPropertyAvailability(req, res, next) {
  try {
    const result = await propertyService.getPropertyAvailability(req.params.id);
    if (!result) return res.status(404).json({ error: 'Property not found' });
    res.json(result);
  } catch (e) {
    next(e);
  }
}

module.exports = { getProperties, getPropertyAvailability };
