import api from '@/lib/axios';
import { CreateBookingInput } from '../types/booking.types';

export const createBooking = async (data: CreateBookingInput) => {
  const response = await api.post('/bookings', data);
  return response.data;
};
