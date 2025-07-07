import api from '@/lib/axios';

export const getRoomById = async (id: string) => {
  console.log('Calling backend with room ID:', id); 
  
  const response = await api.get(`/rooms/${id}`);
  return response.data;
};
