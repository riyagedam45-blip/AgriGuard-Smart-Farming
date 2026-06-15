const express = require('express');
const router = express.Router();
const { getCurrent, getForecastData } = require('../controllers/weatherController');

router.get('/current', getCurrent);
router.get('/forecast', getForecastData);

module.exports = router;
