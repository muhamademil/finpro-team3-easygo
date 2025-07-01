// src/services/room.service.ts
import prisma from "@/prisma";

export class RoomService {
  public async findById(id: number) {
    return prisma.room.findUnique({
      where: { id },
      include: {
        property: true, // jika ingin tampilkan info property juga
      },
    });
  }

  public async getAvailability(roomId: number, start: string, end: string) {
    return prisma.roomAvailability.findMany({
      where: {
        roomId,
        date: {
          gte: new Date(start),
          lte: new Date(end),
        },
      },
      orderBy: {
        date: 'asc',
      },
    });
  }
}
