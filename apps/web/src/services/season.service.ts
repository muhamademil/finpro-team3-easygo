import api from '@/lib/axios';
import type { Room, Property } from '@/types/type';
import type { CalendarDayData } from '@/types/season.type';

/**
 * Mengambil semua properti milik tenant yang sedang login.
 * (Diasumsikan fungsi ini ada di service lain, tapi kita bisa letakkan di sini juga)
 */
export const getMyPropertiesForSeasonAPI = async (): Promise<Property[]> => {
  try {
    const response = await api.get('/tenant/properties');
    return response.data.data;
  } catch (error) {
    console.error('Gagal mengambil properti tenant:', error);
    return [];
  }
};

/**
 * Mengambil semua kamar dari satu properti spesifik.
 */
export const getRoomsByPropertyAPI = async (
  propertyId: string,
): Promise<Room[]> => {
  try {
    // Sesuaikan dengan rute backend Anda
    const response = await api.get(`/rooms/property/${propertyId}/rooms`);
    return response.data.data;
  } catch (error) {
    console.error('Gagal mengambil kamar:', error);
    return [];
  }
};

/**
 * Mengambil data kalender (ketersediaan & harga) untuk satu kamar.
 */
export const getRoomCalendarDataAPI = async (
  roomId: string,
  month: number,
  year: number,
): Promise<CalendarDayData[]> => {
  try {
    const response = await api.get(`/rooms/${roomId}/availability`, {
      params: { month, year },
    });
    return response.data.data;
  } catch (error) {
    console.error('Gagal mengambil data kalender:', error);
    return [];
  }
};

/**
 * Menyimpan perubahan harga khusus dan ketersediaan untuk satu tanggal.
 */
export const saveCalendarOverridesAPI = async (payload: {
  roomId: string;
  date: string;
  price?: number;
  is_available: boolean;
}) => {
  const { roomId, date, price, is_available } = payload;

  // Kita akan memanggil dua endpoint jika perlu
  const promises = [];

  // Update ketersediaan
  promises.push(
    api.put(`/rooms/${roomId}/availability`, {
      date,
      isAvailable: is_available,
    }),
  );

  // Jika ada harga baru, update peak price. Jika tidak, hapus peak price yang ada.
  if (price) {
    promises.push(
      api.put(`/rooms/${roomId}/peak-price`, {
        date,
        type: 'NOMINAL',
        amount: price,
      }),
    );
  } else {
    promises.push(
      api.delete(`/rooms/${roomId}/peak-price`, { data: { date } }),
    );
  }

  return Promise.all(promises);
};
