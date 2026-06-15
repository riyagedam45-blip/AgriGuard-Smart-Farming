const { getCurrentWeather, getForecast, generateAgriAlerts } = require('../services/weatherService');

// @desc    Get current weather + agriculture alerts
// @route   GET /api/weather/current
exports.getCurrent = async (req, res, next) => {
  try {
    const { lat = 28.6139, lon = 77.2090 } = req.query; // Default: New Delhi

    const weather = await getCurrentWeather(parseFloat(lat), parseFloat(lon));
    const forecast = await getForecast(parseFloat(lat), parseFloat(lon));
    const alerts = generateAgriAlerts(weather, forecast);

    res.json({
      success: true,
      data: { weather, alerts }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get 5-day forecast with daily agriculture alerts
// @route   GET /api/weather/forecast
exports.getForecastData = async (req, res, next) => {
  try {
    const { lat = 28.6139, lon = 77.2090 } = req.query;

    const forecast = await getForecast(parseFloat(lat), parseFloat(lon));

    res.json({
      success: true,
      data: { forecast }
    });
  } catch (error) {
    next(error);
  }
};
