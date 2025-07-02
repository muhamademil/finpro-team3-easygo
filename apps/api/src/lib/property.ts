// apps/backend/src/lib/properties.ts
import { PrismaClient } from '@prisma/client';
import { PropertyQuery } from '@/models/property.interface';

const prisma = new PrismaClient();

// Create Property (dengan tenantId)
export async function createProperty(
  tenantId: number,
  data: {
    name: string;
    description?: string;
    location: string;
    mainImage: string;
    category: string;
  }
) {
  return await prisma.property.create({
    data: {
      tenantId,
      ...data,
    },
  });
}

// Get All Properties with optional filtering
export async function getAllProperties(query?: PropertyQuery) {
  return await prisma.property.findMany({
    where: {
      location: query?.location || undefined,
      category: query?.category || undefined,
    },
    include: {
      rooms: true, // include rooms if needed
    },
  });
}

// Get property by ID
export async function getPropertyById(id: string | number) {
  return await prisma.property.findUnique({
    where: {
      id: typeof id === 'string' ? parseInt(id) : id,
    },
    include: {
      rooms: true,
    },
  });
}

// Update property
export async function updateProperty(
  id: string | number,
  data: {
    name?: string;
    description?: string;
    location?: string;
    mainImage?: string;
    category?: string;
  }
) {
  return await prisma.property.update({
    where: {
      id: typeof id === 'string' ? parseInt(id) : id,
    },
    data,
  });
}

// Delete property
export async function deleteProperty(id: string | number) {
  return await prisma.property.delete({
    where: {
      id: typeof id === 'string' ? parseInt(id) : id,
    },
  });
}
