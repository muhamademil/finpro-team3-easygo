import api from '@/lib/axios';
import { CreateBookingInput, Booking } from '../types/booking.types';

export const createBooking = async (
  data: CreateBookingInput
): Promise<Booking> => {
  const response = await api.post('/bookings', data);
  return response.data.data;
};
