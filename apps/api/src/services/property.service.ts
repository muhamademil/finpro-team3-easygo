import { prisma } from '@/lib/prisma';
import { Prisma, PropertyCategory } from '@prisma/client';
import { PropertyQueryParams } from '@/models/property.model';
import { Validation } from '@/validation/validation';
import { PropertyValidation } from '@/validation/property-validation';
import { ResponseError } from '@/error/response.error';
import { CreatePropertyInput, RoomInput } from '@/models/property.model';

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

  public async createProperty(
    userId: string,
    propertyData: CreatePropertyInput,
  ) {
    const validatedData = Validation.validate(
      PropertyValidation.CREATE,
      propertyData,
    );

    // 1. Cari record Tenant berdasarkan userId yang login
    const tenant = await prisma.tenant.findUnique({
      where: { user_id: userId },
    });

    if (!tenant) {
      throw new ResponseError(
        404,
        'Profil tenant tidak ditemukan untuk pengguna ini.',
      );
    }

    // 2. Gunakan transaksi untuk memastikan semua data berhasil dibuat
    const newProperty = await prisma.$transaction(async (tx) => {
      // a. Buat record Property utama
      const property = await tx.property.create({
        data: {
          tenant_id: tenant.id,
          name: validatedData.name,
          description: validatedData.description,
          address: validatedData.address,
          city: validatedData.city,
          latitude: validatedData.latitude,
          longitude: validatedData.longitude,
          category: validatedData.category,
          // Hitung harga terendah dari kamar yang diinput
          lowest_price: Math.min(
            ...validatedData.rooms.map((r) => r.base_price),
          ),
        },
      });

      // b. Buat semua kamar
      await tx.room.createMany({
        data: validatedData.rooms.map((room: RoomInput) => ({
          property_id: property.id,
          name: room.name,
          base_price: room.base_price,
          max_guest: room.max_guest,
        })),
      });

      // c. Hubungkan semua fasilitas
      await tx.propertyFacility.createMany({
        data: validatedData.facilityIds.map((id: string) => ({
          property_id: property.id,
          facility_id: id,
        })),
      });

      // d. Simpan semua URL gambar
      await tx.propertyImage.createMany({
        data: validatedData.imageUrls.map((url: string) => ({
          property_id: property.id,
          image_url: url,
        })),
      });

      // Ambil kembali data properti yang baru dibuat beserta relasinya untuk dikirim sebagai respon
      const result = await tx.property.findUnique({
        where: { id: property.id },
        include: {
          images: true,
          rooms: true,
          facilities: {
            include: {
              facility: true,
            },
          },
        },
      });

      return result;
    });

    return newProperty;
  }
}