import api from '@/lib/axios';

export const getUploadSignatureAPI = async () => {
  return await api.get('/uploads/signature');
};
