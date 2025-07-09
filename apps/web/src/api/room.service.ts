import api from '@/lib/axios';
export interface RoomAvailabilityData {
  date: string;
  is_available: boolean;
  price: number;
}

export const getRoomById = async (id: string) => {
  console.log('Calling backend with room ID:', id);
  const response = await api.get(`/rooms/${id}`);
  return response.data.data;
};

export const getRoomAvailabilityAPI = async (
  roomId: string,
  month: number,
  year: number,
): Promise<RoomAvailabilityData[]> => {
  try {
    const response = await api.get(`/rooms/${roomId}/availability`, {
      params: { month, year },
    });
    return response.data.data;
  } catch (error) {
    console.error('Gagal mengambil data ketersediaan kamar:', error);
    return [];
  }
};
