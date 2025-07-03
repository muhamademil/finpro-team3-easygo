export type PaymentMethod = 'MIDTRANS' | 'MANUAL';

export type BookingStatus =
  | 'PENDING_PAYMENT'
  | 'PENDING_CONFIRMATION'
  | 'CONFIRMED'
  | 'CANCELLED'
  | 'COMPLETED';

export interface CreateBookingInput {
  user_id: string;
  room_id: string;
  check_in: string;
  check_out: string;
  guest_adults: number;
  guest_children: number;
  full_name: string;
  email: string;
  phone: string;
  payment_method: PaymentMethod;
}

export interface Booking {
  id: string;
  user_id: string;
  room_id: string;
  check_in: string;
  check_out: string;
  guest_adults: number;
  guest_children: number;
  full_name: string;
  email: string;
  phone: string;
  payment_method: PaymentMethod;
  status: BookingStatus;
  expires_at: string | null;
  created_at: string;
}
