import api from '@/lib/axios';
import { Property } from '@/types/type';
import { SearchFilters } from '@/types/explore.types';

// Tipe untuk hasil API yang menyertakan pagination
type PaginatedProperties = {
  properties: Property[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

/**
 * Memanggil endpoint GET /api/properties dengan semua filter,
 * sorting, dan pagination yang relevan.
 * @param filters - Objek berisi semua parameter pencarian.
 */
export const searchPropertiesAPI = async (filters: SearchFilters) => {
  try {
    // Pisahkan sortBy menjadi dua bagian untuk API
    const [sortBy, orderBy] = filters.sortBy.split('_');

    const response = await api.get('/properties', {
      params: {
        city: filters.location,
        category:
          filters.category === 'all'
            ? undefined
            : filters.category.toUpperCase(),
        limit: 10, // Atur items per page di sini
        page: filters.page,
        sortBy,
        orderBy,
        // Anda bisa menambahkan parameter lain di sini nanti, seperti harga
      },
    });
    // Kembalikan seluruh objek data dari API
    return response.data.data as PaginatedProperties;
  } catch (error) {
    console.error('Gagal melakukan pencarian properti:', error);
    // Kembalikan struktur data default jika gagal
    return {
      properties: [],
      pagination: { total: 0, page: 1, limit: 10, totalPages: 0 },
    };
  }
};
