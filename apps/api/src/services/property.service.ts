import { prisma } from '@/lib/prisma';
import { Prisma, PropertyCategory } from '@prisma/client';
import { PropertyQueryParams } from '@/models/property.model'; // Impor tipe baru kita

export class PropertyService {
  public async getProperties(queryParams: PropertyQueryParams) {
    const {
      city,
      category,
      type,
      sortBy,
      orderBy = 'asc',
      limit = '10',
      page = '1',
    } = queryParams;

    const take = parseInt(limit);

    // --- Logika untuk sortBy=popularity ---
    if (sortBy === 'popularity') {
      const whereClause = city
        ? Prisma.sql`WHERE p.city ILIKE ${'%' + city + '%'}`
        : Prisma.empty;

      const popularProperties = await prisma.$queryRaw`
        SELECT p.*, COUNT(b.id)::integer as "bookingCount"
        FROM "properties" p
        JOIN "rooms" r ON p.id = r.property_id
        JOIN "bookings" b ON r.id = b.room_id
        ${whereClause}
        GROUP BY p.id
        ORDER BY "bookingCount" DESC
        LIMIT ${take};
      `;

      return { properties: popularProperties };
    }

    // --- Logika untuk type=random ---
    if (type === 'random') {
      const allPropertyIds = await prisma.property.findMany({
        select: { id: true },
      });

      const shuffledIds = allPropertyIds.sort(() => Math.random() - 0.5);
      const randomIds = shuffledIds.slice(0, take).map((p) => p.id);

      const randomProperties = await prisma.property.findMany({
        where: { id: { in: randomIds } },
        include: { images: { take: 1 } },
      });

      return { properties: randomProperties };
    }

    // --- Logika Filter & Sort Biasa ---
    const where: Prisma.PropertyWhereInput = {};

    if (city) {
      where.city = { contains: city, mode: 'insensitive' };
    }
    if (category && Object.values(PropertyCategory).includes(category)) {
      where.category = category;
    }
    if (type === 'recommendation') {
      where.is_recommended = true;
    }

    const orderByClause: Prisma.PropertyOrderByWithRelationInput = {};
    if (sortBy === 'price') {
      orderByClause.lowest_price = orderBy;
    }

    const skip = (parseInt(page) - 1) * take;

    const properties = await prisma.property.findMany({
      where,
      orderBy: orderByClause,
      take,
      skip,
      include: {
        images: { take: 1 },
      },
    });

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
