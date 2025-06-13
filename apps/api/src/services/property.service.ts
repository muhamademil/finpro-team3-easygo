import { prisma } from '@/lib/prisma';
import {
  CreatePropertyInput,
  UpdatePropertyInput,
  PropertyQuery,
} from '@/models/property.interface';

export class PropertyService {
  public async createProperty(tenantId: number, input: CreatePropertyInput) {
  const data = {
    ...input,
    tenantId,
  };

  console.log("Creating with data:", data);

  return await prisma.property.create({
    data,
  });
}


  public async getAllProperties(query: PropertyQuery) {
    const {
      location,
      name,
      category,
      sortBy = 'createdAt',
      order = 'desc',
    } = query;

    return await prisma.property.findMany({
      where: {
        location,
        name: name ? { contains: name, mode: 'insensitive' } : undefined,
        category,
      },
      orderBy: {
        [sortBy]: order,
      },
      include: {
        rooms: true,
        reviews: true,
      },
    });
  }

  public async getPropertyById(id: string) {
    return await prisma.property.findUnique({
      where: { id: Number(id) },
      include: {
        rooms: true,
        reviews: true,
      },
    });
  }

  public async updateProperty(id: string, data: UpdatePropertyInput) {
    return await prisma.property.update({
      where: { id: Number(id) },
      data,
    });
  }

  public async deleteProperty(id: string) {
    return await prisma.property.delete({
      where: { id: Number(id) },
    });
  }
}
