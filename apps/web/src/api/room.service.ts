import api from '@/lib/axios';

export const getRoomById = async (id: string) => {
  const response = await api.get(`/rooms/${id}`);
  return response.data;
};
