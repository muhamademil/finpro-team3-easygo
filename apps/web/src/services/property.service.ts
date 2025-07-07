import api from '@/lib/axios';
import { CreatePropertyInput, UpdatePropertyInput } from '@/types/type';
import type { Property } from '@/types/detailProperty.types';

export const createPropertyAPI = (data: CreatePropertyInput) => {
  return api.post('/properties', data);
};

export const getPropertyByIdAPI = async (
  propertyId: string,
): Promise<Property | null> => {
  try {
    const response = await api.get(`/properties/${propertyId}`);
    return response.data.data;
  } catch (error) {
    console.error(
      `Gagal mengambil detail properti dengan ID: ${propertyId}`,
      error,
    );
    return null;
  }
};

export const updatePropertyAPI = async (
  propertyId: string,
  data: UpdatePropertyInput,
) => {
  return api.put(`/properties/${propertyId}`, data);
};
