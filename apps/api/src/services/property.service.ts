import { prisma } from '@/lib/prisma';
import { Prisma } from '@prisma/client';

export class PropertyService {
  public async getProperties(queryParams: any) {
    const {
      city,
      category,
      type,
      sortBy,
      orderBy = 'asc',
      limit = '10',
      page = '1',
    } = queryParams;

    const where: Prisma.PropertyWhereInput = {};

    if (city) {
      where.city = { contains: city as string, mode: 'insensitive' };
    }
    if (category) {
      where.category = category as any; // Sesuaikan dengan tipe enum Anda
    }
    if (type === 'recommendation') {
      where.is_recommended = true;
    }

    const orderByClause: Prisma.PropertyOrderByWithRelationInput = {};

    if (sortBy === 'price') {
      orderByClause.lowest_price = orderBy;
    }

    const take = parseInt(limit);
    const skip = (parseInt(page) - 1) * take;

    const properties = await prisma.property.findMany({
      where,
      orderBy: orderByClause,
      take,
      skip,
      include: {
        images: {
          take: 1,
        },
      },
    });

    // Query total data (pagination frontend)
    const totalProperties = await prisma.property.count({ where });

    return {
      properties,
      pagination: {
        total: totalProperties,
        page: parseInt(page),
        limit: take,
        totalPages: Math.ceil(totalProperties / take),
      },
    };
  }
}
