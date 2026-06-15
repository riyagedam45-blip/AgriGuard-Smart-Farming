import API from './api';

export const getCurrentWeather = async (lat = 28.6139, lon = 77.209) => {
  const { data } = await API.get(`/weather/current?lat=${lat}&lon=${lon}`);
  return data;
};

export const getForecast = async (lat = 28.6139, lon = 77.209) => {
  const { data } = await API.get(`/weather/forecast?lat=${lat}&lon=${lon}`);
  return data;
};

export const getHistory = async (page = 1, limit = 10, filters = {}) => {
  const params = new URLSearchParams({ page, limit, ...filters });
  const { data } = await API.get(`/history?${params}`);
  return data;
};

export const getStats = async () => {
  const { data } = await API.get('/history/stats');
  return data;
};

export const getPrediction = async (id) => {
  const { data } = await API.get(`/history/${id}`);
  return data;
};

export const deletePrediction = async (id) => {
  const { data } = await API.delete(`/history/${id}`);
  return data;
};
