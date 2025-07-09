import { prisma } from '../prisma/client';
import { CreateBookingInput, UpdateBookingInput } from '../types/booking.types';

export class BookingService {
  public async createBooking(data: CreateBookingInput) {
    const room = await prisma.room.findUnique({
      where: { id: data.room_id },
      select: { base_price: true },
    });

    if (!room) {
      throw new Error('Room not found');
    }

    const checkIn = new Date(data.check_in);
    const checkOut = new Date(data.check_out);
    const nights =
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24);

    if (nights <= 0) {
      throw new Error('Invalid check-in/check-out date');
    }

    const fixedFee = 789;
    const totalPrice = room.base_price * nights + fixedFee;

    const booking = await prisma.booking.create({
      data: {
        user: { connect: { id: data.user_id } },
        room: { connect: { id: data.room_id } },
        check_in: checkIn,
        check_out: checkOut,
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

    return {
      ...booking,
      total_price: totalPrice,
    };
  }

  public async findAllBooking() {
    return await prisma.booking.findMany({
      include: { user: true, room: true, payment: true },
    });
  }

  public async findBookingById(id: string) {
    const now = new Date();

    await prisma.booking.updateMany({
      where: {
        status: 'CONFIRMED',
        check_out: { lt: now },
      },
      data: {
        status: 'COMPLETED',
      },
    });

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
    const now = new Date();

    await prisma.booking.updateMany({
      where: {
        user_id: userId,
        status: 'CONFIRMED',
        check_out: {
          lt: now,
        },
      },
      data: {
        status: 'COMPLETED',
      },
    });

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
