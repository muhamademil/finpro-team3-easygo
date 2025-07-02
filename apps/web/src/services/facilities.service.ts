import api from '@/lib/axios'; // Gunakan instance Axios terpusat Anda

export const getFacilitiesAPI = () => {
  return api.get('/facilities');
};
