export interface Room {
  id: number;
  name: string;
  basePrice: string;
  capacity: number;
  picture?: string;
}

export interface Booking {
  id?: number;
  userId: number;
  roomId: number;
  startDate: string;
  endDate: string;
  totalPrice: string;
  status?: 'MENUNGGU_PEMBAYARAN' | 'MENUNGGU_KONFIRMASI' | 'DIKONFIRMASI' | 'DIBATALKAN';
  paymentProofUrl?: string;
}

export interface BookingPayload extends Booking {
  room?: Room;
}
