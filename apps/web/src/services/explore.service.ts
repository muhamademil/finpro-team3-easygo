import api from '@/lib/axios';
import { Property } from '@/types/explore.types';
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

export const searchPropertiesAPI = async (filters: SearchFilters) => {
  try {
    const [sortBy, orderBy] = filters.sortBy.split('_');

    const response = await api.get('/properties', {
      params: {
        city: filters.location,
        category:
          filters.category === 'all'
            ? undefined
            : filters.category.toUpperCase(),
        limit: 10,
        page: filters.page,
        sortBy,
        orderBy,
      },
    });
    return response.data.data as PaginatedProperties;
  } catch (error) {
    console.error('Gagal melakukan pencarian properti:', error);
    return {
      properties: [],
      pagination: { total: 0, page: 1, limit: 10, totalPages: 0 },
    };
  }
};
