import api from '@/lib/axios';
import { Property } from '@/types/type';

// Tipe untuk membantu TypeScript memahami struktur respon API
type ApiResponse = {
  message: string;
  data: {
    properties: Property[];
    pagination?: {
      total: number;
      page: number;
      limit: number;
      totalPages: number;
    };
  };
};

/**
 * Mengambil properti "Hits di Bandung" (berdasarkan popularitas).
 */
export const getBandungHitsAPI = async (): Promise<Property[]> => {
  try {
    const response = await api.get<ApiResponse>('/properties', {
      params: {
        city: 'Bandung',
        sortBy: 'popularity',
        limit: 5,
      },
    });
    // PERBAIKAN: Akses data yang bersarang dengan benar
    return response.data.data.properties;
  } catch (error) {
    console.error('Gagal mengambil data Hits di Bandung:', error);
    return []; // Kembalikan array kosong jika gagal agar UI tidak crash
  }
};

/**
 * Mengambil properti "Harga Murah".
 */
export const getCheapPropertiesAPI = async (): Promise<Property[]> => {
  try {
    const response = await api.get<ApiResponse>('/properties', {
      params: {
        sortBy: 'price',
        orderBy: 'asc',
        limit: 5,
      },
    });
    // PERBAIKAN: Akses data yang bersarang dengan benar
    return response.data.data.properties;
  } catch (error) {
    console.error('Gagal mengambil data Harga Murah:', error);
    return [];
  }
};

/**
 * Mengambil properti "Rekomendasi" (acak).
 */
export const getRecommendedPropertiesAPI = async (): Promise<Property[]> => {
  try {
    const response = await api.get<ApiResponse>('/properties', {
      params: {
        type: 'random',
        limit: 5,
      },
    });
    // PERBAIKAN: Akses data yang bersarang dengan benar
    return response.data.data.properties;
  } catch (error) {
    console.error('Gagal mengambil data Rekomendasi:', error);
    return [];
  }
};
