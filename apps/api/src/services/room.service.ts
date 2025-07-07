// src/services/room.service.ts
import { prisma } from '@/prisma/client';
import { CreateRoomInput, UpdateRoomInput } from '@/types/room.types';
import { startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

export class RoomService {
  public async createRoom(data: CreateRoomInput) {
    return await prisma.room.create({
      data: {
        property: { connect: { id: data.property_id } },
        name: data.name,
        base_price: data.base_price,
        max_guest: data.max_guest,
      },
      include: {
        images: true,
        property: true,
      },
    });
  }

  public async findAllRooms() {
    return await prisma.room.findMany({
      include: {
        images: true,
        property: true,
      },
    });
  }

  public async findRoomById(id: string) {
    return await prisma.room.findUnique({
      where: { id },
      include: {
        images: true,
        property: true,
      },
    });
  }

  public async updateRoom(id: string, data: UpdateRoomInput) {
    return await prisma.room.update({
      where: { id },
      data,
    });
  }

  public async deleteRoom(id: string) {
    return await prisma.room.delete({
      where: { id },
    });
  }

  public async getRoomAvailability(
    roomId: string,
    month: number,
    year: number,
  ) {
    const startDate = startOfMonth(new Date(year, month - 1));
    const endDate = endOfMonth(new Date(year, month - 1));

    // 1. Ambil data dasar kamar
    const room = await prisma.room.findUnique({
      where: { id: roomId },
      select: { base_price: true },
    });

    if (!room) {
      return []; // Atau lempar error 404
    }

    // 2. Ambil semua data ketersediaan & harga khusus di rentang bulan ini
    const [availabilities, peakPrices] = await Promise.all([
      prisma.roomAvailability.findMany({
        where: {
          room_id: roomId,
          date: { gte: startDate, lte: endDate },
        },
      }),
      prisma.peakPrice.findMany({
        where: {
          room_id: roomId,
          date: { gte: startDate, lte: endDate },
        },
      }),
    ]);

    // 3. Buat "peta" untuk akses cepat
    const availabilityMap = new Map(
      availabilities.map((a) => [
        a.date.toISOString().split('T')[0],
        a.is_available,
      ]),
    );
    const peakPriceMap = new Map(
      peakPrices.map((p) => [p.date.toISOString().split('T')[0], p.amount]),
    );

    // 4. Generate setiap hari dalam sebulan dan tentukan statusnya
    const daysInMonth = eachDayOfInterval({ start: startDate, end: endDate });

    const result = daysInMonth.map((day) => {
      const dateString = day.toISOString().split('T')[0];

      const isAvailable = availabilityMap.get(dateString) ?? true; // Defaultnya tersedia
      const peakPrice = peakPriceMap.get(dateString);
      const price = peakPrice ?? room.base_price; // Gunakan harga puncak jika ada

      return {
        date: dateString,
        is_available: isAvailable,
        price: price,
      };
    });

    return result;
  }
}
