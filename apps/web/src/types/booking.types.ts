export type PaymentMethod = 'MIDTRANS' | 'MANUAL';

export interface CreateBookingInput {
  user_id: string;
  room_id: string;
  check_in: string; // format: 'YYYY-MM-DD'
  check_out: string;
  guest_adults: number;
  guest_children: number;
  full_name: string;
  email: string;
  phone: string;
  payment_method: PaymentMethod;
}
