import { useState, useEffect } from 'react';
import { getCurrentWeather } from '../services/weatherService';

export function useWeather() {
  const [weather, setWeather] = useState(null);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const data = await getCurrentWeather();
        setWeather(data.data.weather);
        setAlerts(data.data.alerts);
      } catch (error) {
        console.error('Weather fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchWeather();
    // Refresh every 30 minutes
    const interval = setInterval(fetchWeather, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  return { weather, alerts, loading };
}
