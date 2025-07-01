import { prisma } from '@/lib/prisma';
import { BookingStatus } from '@prisma/client';
import {
  IBookingService,
  IBookingCreateInput,
  IBookingUpdateInput,
} from '@/models/booking.interface';

export class BookingService implements IBookingService {
  public async create(data: IBookingCreateInput) {
    return prisma.booking.create({
      data: {
        ...data,
        status: BookingStatus.MENUNGGU_PEMBAYARAN,
      },
    });
  }

  public async findAllByUser(userId: number) {
    return prisma.booking.findMany({
      where: { userId },
      include: {
        room: true,
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  public async findById(id: number) {
    return prisma.booking.findUnique({
      where: { id },
      include: {
        room: true,
      },
    });
  }

  public async update(id: number, data: IBookingUpdateInput) {
    return prisma.booking.update({
      where: { id },
      data,
    });
  }

  public async delete(id: number) {
    await prisma.booking.delete({
      where: { id },
    });
  }
}
