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
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
        room: {
          select: {
            id: true,
            name: true,
            base_price: true,
            property: {
              select: {
                id: true,
                name: true,
                address: true,
                city: true,
                images: {
                  select: {
                    image_url: true,
                  },
                },
              },
            },
          },
        },
        review: true,
        payment: true,
      },
    });
  }

  public async updateBookingStatus(id: string, data: UpdateBookingInput) {
    return await prisma.booking.update({
      where: { id },
      data,
    });
  }

  public async findBookingsByUserId(userId: string) {
    return await prisma.booking.findMany({
      where: { user_id: userId },
      include: {
        room: {
          select: {
            id: true,
            name: true,
            images: {
              select: { image_url: true },
            },
            property: {
              select: {
                id: true,
                name: true,
                city: true,
              },
            },
          },
        },
        review: true,
        payment: true,
      },
      orderBy: {
        created_at: 'desc',
      },
    });
  }

  public async deleteBooking(id: string) {
    return await prisma.booking.delete({ where: { id } });
  }
}
