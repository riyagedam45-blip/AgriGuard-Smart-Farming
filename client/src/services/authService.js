import API from './api';

export const loginUser = async (email, password) => {
  const { data } = await API.post('/auth/login', { email, password });
  return data;
};

export const registerUser = async (name, email, password) => {
  const { data } = await API.post('/auth/register', { name, email, password });
  return data;
};

export const getProfile = async () => {
  const { data } = await API.get('/auth/profile');
  return data;
};

export const updateProfile = async (updates) => {
  const { data } = await API.put('/auth/profile', updates);
  return data;
};
