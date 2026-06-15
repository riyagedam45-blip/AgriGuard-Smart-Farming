import API from './api';

export const analyzeCropImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);

  const { data } = await API.post('/detect/analyze', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return data;
};

export const getDiseases = async () => {
  const { data } = await API.get('/detect/diseases');
  return data;
};
