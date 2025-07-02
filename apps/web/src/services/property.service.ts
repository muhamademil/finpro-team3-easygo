import api from '@/lib/axios';
import { CreatePropertyInput } from '@/lib/type';

export const createPropertyAPI = (data: CreatePropertyInput) => {
  return api.post('/properties', data);
};
