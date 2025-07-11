import api from '@/lib/axios';
import {
  CreateBookingInput,
  Booking,
  BookingDetailPayload,
} from '../../src/types/booking.types';

export const createBooking = async (
  data: CreateBookingInput,
): Promise<Booking> => {
  console.log('Sending booking data:', data);
  const response = await api.post('/bookings', data);
  return response.data.data;
};

export const getBookingDetail = async (id: string): Promise<Booking> => {
  const response = await api.get(`/bookings/${id}`);
  return response.data;
};

export const getMyBookings = async (): Promise<BookingDetailPayload[]> => {
  const response = await api.get('/bookings/me');
  return response.data;
};

export const getBookingsForTenant = async (): Promise<Booking[]> => {
  const response = await api.get('/bookings'); // tenant-accessible
  return response.data;
};

export const approveBooking = async (id: string): Promise<Booking> => {
  const response = await api.patch(`/bookings/${id}/approve`);
  return response.data.data;
};

export const rejectBooking = async (id: string): Promise<Booking> => {
  const response = await api.patch(`/bookings/${id}/reject`);
  return response.data.data;
};
