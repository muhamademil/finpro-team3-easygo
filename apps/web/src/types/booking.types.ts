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

export interface BookingDetailPayload {
  id: string;
  check_in: string;
  check_out: string;
  status: string;
  review?: {
    id: string;
    rating: number;
    comment: string;
  } | null;
  user: {
    id: string;
    name: string;
    email: string;
  };
  room: {
    id: string;
    name: string;
    images: {
      image_url: string;
    }[];
    property: {
      id: string;
      name: string;
      city: string;
    };
  };
}
