import api from '@/lib/axios';
import { Property } from '@/lib/type';
import { cookies } from 'next/headers';

export const getMyPropertiesAPI = async (): Promise<Property[]> => {
  try {
    const token = (await cookies()).get('auth-token')?.value;
    const response = await api.get('/tenant/properties', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.data;
  } catch (error) {
    console.error('Gagal mengambil properti tenant:', error);
    return [];
  }
};
