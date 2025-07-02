// src/services/room.service.ts
import { prisma } from '@/prisma/client';
import { CreateRoomInput, UpdateRoomInput } from '@/types/room.types';

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
}
