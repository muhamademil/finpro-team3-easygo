import { BookingStatus, PaymentMethod } from "@prisma/client";

export interface CreateBookingInput {
  user_id: string;
  room_id: string;
  check_in: Date;
  check_out: Date;
  guest_adults: number;
  guest_children: number;
  full_name: string;
  email: string;
  phone: string;
  payment_method: PaymentMethod;
}

export interface UpdateBookingInput {
  status?: BookingStatus;
  expires_at?: Date;
}
