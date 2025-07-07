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
  room: {
    base_price: number;
    images?: {
      image_url: string;
    }[];
  };
  payment?: {
    amount: number;
    payment_proof_url?: string;
  };
}

export interface BookingDetail {
  id: string;
  check_in: string;
  check_out: string;
  expires_at?: string;
  payment?: {
    amount: number;
    payment_proof_url?: string;
  };
  room: {
    base_price: number;
  };
}

export interface BookingCardData {
  id: string;
  status: BookingStatus;
  user: {
    name: string;
    email: string;
    phone?: string;
    imageUrl?: string;
  };
  check_in: string;
  check_out: string;
  phone: string;
  payment_method: PaymentMethod;
  payment: {
    amount?: number;
    date: string;
    proofUrl?: string;
  };
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
    base_price: number;
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
