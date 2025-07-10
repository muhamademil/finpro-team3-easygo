import api from "../lib/axios";

export interface RoomAvailabilityData {
  date: string;
  is_available: boolean;
  price: number;
}

//Get API untuk mendapatkan data ketersediaan sebuah kamar

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
