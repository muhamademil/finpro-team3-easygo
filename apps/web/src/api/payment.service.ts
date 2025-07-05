import api from '@/lib/axios';
import { CreateManualPaymentInput } from '@/types/payment.types';

export const createManualPayment = async (data: CreateManualPaymentInput) => {
  const res = await api.post('/payments', data);
  return res.data;
};
export const getAllPayments = async () => {
  const res = await api.get('/payments');
  return res.data;
};
export const getPaymentById = async (id: string) => {
  const res = await api.get(`/payments/${id}`);
  return res.data;
};

export const confirmManualPayment = async (bookingId: string) => {
  const res = await api.patch(`/payments/confirm/${bookingId}`);
  return res.data;
};

export const getPendingConfirmationBookings = async () => {
  const res = await api.get('/bookings?status=PENDING_CONFIRMATION');
  return res.data;
};

export const deletePayment = async (id: string) => {
  const res = await api.delete(`/payments/${id}`);
  return res.data;
};
