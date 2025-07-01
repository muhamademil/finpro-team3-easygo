import { Booking,BookingStatus } from "@prisma/client";

export interface IBookingCreateInput {
  userId: number;
  roomId: number;
  startDate: Date;
  endDate: Date;
  totalPrice: string;
  paymentProofUrl?: string;
}

export interface IBookingUpdateInput {
  startDate?: Date;
  endDate?: Date;
  totalPrice?: string;
  status?: BookingStatus;
  paymentProofUrl?: string;
}

export interface IBookingService {
  create(data: IBookingCreateInput): Promise<Booking>;
  findAllByUser(userId: number): Promise<Booking[]>;
  findById(id: number): Promise<Booking | null>;
  update(id: number, data: IBookingUpdateInput): Promise<Booking>;
  delete(id: number): Promise<void>;
}