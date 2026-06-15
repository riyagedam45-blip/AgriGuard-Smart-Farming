const axios = require('axios');

const OPENWEATHER_BASE = 'https://api.openweathermap.org/data/2.5';

/**
 * Fetch current weather for coordinates
 */
async function getCurrentWeather(lat, lon) {
  const apiKey = process.env.WEATHER_API_KEY;

  // If no API key or demo key, return mock data
  if (!apiKey || apiKey === 'demo_key' || apiKey === 'your_openweathermap_api_key_here') {
    return getMockCurrentWeather(lat, lon);
  }

  try {
    const { data } = await axios.get(`${OPENWEATHER_BASE}/weather`, {
      params: { lat, lon, appid: apiKey, units: 'metric' }
    });

    return {
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      pressure: data.main.pressure,
      windSpeed: data.wind.speed,
      windDirection: data.wind.deg,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      cloudCover: data.clouds.all,
      rain: data.rain ? data.rain['1h'] || 0 : 0,
      city: data.name,
      country: data.sys.country,
      sunrise: new Date(data.sys.sunrise * 1000).toISOString(),
      sunset: new Date(data.sys.sunset * 1000).toISOString()
    };
  } catch (error) {
    console.error('Weather API error:', error.message);
    return getMockCurrentWeather(lat, lon);
  }
}

/**
 * Fetch 5-day forecast for coordinates
 */
async function getForecast(lat, lon) {
  const apiKey = process.env.WEATHER_API_KEY;

  if (!apiKey || apiKey === 'demo_key' || apiKey === 'your_openweathermap_api_key_here') {
    return getMockForecast();
  }

  try {
    const { data } = await axios.get(`${OPENWEATHER_BASE}/forecast`, {
      params: { lat, lon, appid: apiKey, units: 'metric' }
    });

    // Group by day
    const dailyMap = {};
    data.list.forEach(item => {
      const date = item.dt_txt.split(' ')[0];
      if (!dailyMap[date]) {
        dailyMap[date] = {
          date,
          temps: [],
          humidity: [],
          descriptions: [],
          rain: 0,
          wind: []
        };
      }
      dailyMap[date].temps.push(item.main.temp);
      dailyMap[date].humidity.push(item.main.humidity);
      dailyMap[date].descriptions.push(item.weather[0].description);
      dailyMap[date].rain += item.rain ? item.rain['3h'] || 0 : 0;
      dailyMap[date].wind.push(item.wind.speed);
    });

    return Object.values(dailyMap).slice(0, 5).map(day => ({
      date: day.date,
      tempMin: Math.min(...day.temps),
      tempMax: Math.max(...day.temps),
      avgHumidity: Math.round(day.humidity.reduce((a, b) => a + b, 0) / day.humidity.length),
      totalRain: Math.round(day.rain * 10) / 10,
      maxWind: Math.max(...day.wind),
      description: day.descriptions[Math.floor(day.descriptions.length / 2)]
    }));
  } catch (error) {
    console.error('Forecast API error:', error.message);
    return getMockForecast();
  }
}

/**
 * Generate agriculture-specific weather alerts
 */
function generateAgriAlerts(weather, forecast) {
  const alerts = [];

  // Current weather alerts
  if (weather.temperature < 2) {
    alerts.push({
      type: 'frost',
      severity: 'critical',
      title: '❄️ Frost Warning',
      message: `Temperature is ${weather.temperature}°C. Protect sensitive crops with covers or move potted plants indoors.`,
      icon: 'snowflake'
    });
  }

  if (weather.temperature > 38) {
    alerts.push({
      type: 'heat',
      severity: 'high',
      title: '🔥 Heat Stress Alert',
      message: `Temperature is ${weather.temperature}°C. Increase irrigation, provide shade for sensitive crops, and avoid midday fieldwork.`,
      icon: 'thermometer'
    });
  }

  if (weather.humidity > 85) {
    alerts.push({
      type: 'humidity',
      severity: 'medium',
      title: '💧 High Humidity — Disease Risk',
      message: `Humidity is ${weather.humidity}%. High moisture increases risk of fungal diseases. Monitor crops closely and ensure good air circulation.`,
      icon: 'droplets'
    });
  }

  if (weather.windSpeed > 13.9) { // > 50 km/h
    alerts.push({
      type: 'wind',
      severity: 'high',
      title: '💨 Strong Wind Alert',
      message: `Wind speed is ${(weather.windSpeed * 3.6).toFixed(1)} km/h. Secure loose structures, young trees, and tall crops.`,
      icon: 'wind'
    });
  }

  if (weather.rain > 50) {
    alerts.push({
      type: 'rain',
      severity: 'high',
      title: '🌧️ Heavy Rain Warning',
      message: `Rainfall of ${weather.rain}mm recorded. Check for waterlogging and ensure proper drainage in fields.`,
      icon: 'cloud-rain'
    });
  }

  // Forecast-based alerts
  if (forecast && forecast.length > 0) {
    const totalForecastRain = forecast.reduce((sum, day) => sum + day.totalRain, 0);
    if (totalForecastRain < 1) {
      alerts.push({
        type: 'drought',
        severity: 'medium',
        title: '☀️ Dry Period Ahead',
        message: 'Little to no rain expected in the next 5 days. Plan irrigation schedule accordingly.',
        icon: 'sun'
      });
    }

    const coldDays = forecast.filter(d => d.tempMin < 5);
    if (coldDays.length >= 2) {
      alerts.push({
        type: 'cold-spell',
        severity: 'medium',
        title: '🥶 Cold Spell Approaching',
        message: `${coldDays.length} days with temperatures below 5°C expected. Prepare frost protection measures.`,
        icon: 'thermometer-snowflake'
      });
    }
  }

  // If no alerts, add an "all clear"
  if (alerts.length === 0) {
    alerts.push({
      type: 'clear',
      severity: 'low',
      title: '✅ Favorable Conditions',
      message: 'Weather conditions are favorable for farming. No alerts at this time.',
      icon: 'check-circle'
    });
  }

  return alerts;
}

// ---- Mock data for demo/development ----

function getMockCurrentWeather(lat, lon) {
  return {
    temperature: 28 + Math.round(Math.random() * 8 - 4),
    feelsLike: 30 + Math.round(Math.random() * 6 - 3),
    humidity: 60 + Math.round(Math.random() * 30),
    pressure: 1013,
    windSpeed: 3 + Math.round(Math.random() * 5),
    windDirection: Math.round(Math.random() * 360),
    description: ['partly cloudy', 'sunny', 'light rain', 'overcast clouds'][Math.floor(Math.random() * 4)],
    icon: '02d',
    cloudCover: Math.round(Math.random() * 60),
    rain: Math.random() > 0.7 ? Math.round(Math.random() * 10) : 0,
    city: 'Demo City',
    country: 'IN',
    sunrise: new Date().toISOString(),
    sunset: new Date().toISOString()
  };
}

function getMockForecast() {
  const days = [];
  for (let i = 1; i <= 5; i++) {
    const date = new Date();
    date.setDate(date.getDate() + i);
    days.push({
      date: date.toISOString().split('T')[0],
      tempMin: 20 + Math.round(Math.random() * 6),
      tempMax: 30 + Math.round(Math.random() * 8),
      avgHumidity: 55 + Math.round(Math.random() * 30),
      totalRain: Math.random() > 0.5 ? Math.round(Math.random() * 20) : 0,
      maxWind: 5 + Math.round(Math.random() * 10),
      description: ['scattered clouds', 'light rain', 'clear sky', 'moderate rain', 'overcast'][Math.floor(Math.random() * 5)]
    });
  }
  return days;
}

module.exports = { getCurrentWeather, getForecast, generateAgriAlerts };
