import { PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

export async function getAllEvents() {
  return await prisma.event.findMany();
}

export async function getEventById(id: number) {
  return await prisma.event.findUnique({
    where: { id },
  });
}

export async function createEvent(eventData: {
  eventId: number;
  promotorId: number;
  nameEvents: string;
  categoryEvents: string;
  imgUrl?: string;
  locationEvents: string;
  startDateEvents: Date;
  endDateEvents: Date;
  AvaibleSeats: number;
  

  
}) {
  return await prisma.event.create({
    data: eventData,
  });
}