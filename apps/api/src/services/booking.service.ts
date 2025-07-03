import { prisma } from '@/prisma/client';
import { CreateBookingInput, UpdateBookingInput } from '@/types/booking.types';

export class BookingService {
  public async createBooking(data: CreateBookingInput) {
    return await prisma.booking.create({
      data: {
        user: { connect: { id: data.user_id } },
        room: { connect: { id: data.room_id } },
        check_in: new Date(data.check_in),
        check_out: new Date(data.check_out),
        guest_adults: data.guest_adults,
        guest_children: data.guest_children,
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        payment_method: data.payment_method,
        expires_at:
          data.payment_method === 'MANUAL'
            ? new Date(Date.now() + 2 * 60 * 60 * 1000)
            : null,
      },
      include: {
        user: true,
        room: true,
      },
    });
  }

  public async findAllBooking() {
    return await prisma.booking.findMany({
      include: { user: true, room: true },
    });
  }

  public async findBookingById(id: string) {
    return await prisma.booking.findUnique({
      where: { id },
      include: { user: true, room: true, payment: true },
    });
  }

  public async updateBookingStatus(id: string, data: UpdateBookingInput) {
    return await prisma.booking.update({
      where: { id },
      data,
    });
  }

  public async deleteBooking(id: string) {
    return await prisma.booking.delete({ where: { id } });
  }
}
