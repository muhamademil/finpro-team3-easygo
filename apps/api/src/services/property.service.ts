import { prisma } from '@/lib/prisma';
import { Prisma, PropertyCategory } from '@prisma/client';
import {
  PropertyQueryParams,
  UpdatePropertyInput,
} from '@/models/property.model'; // Impor tipe baru kita
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

      const popularPropertyIds: { id: string }[] = await prisma.$queryRaw`
        SELECT p.id
        FROM "properties" p
        JOIN "rooms" r ON p.id = r.property_id
        JOIN "bookings" b ON r.id = b.room_id
        ${whereClause}
        GROUP BY p.id
        ORDER BY COUNT(b.id) DESC
        LIMIT ${take};
      `;

      if (popularPropertyIds.length === 0) {
        return {
          properties: [],
          pagination: { total: 0, page: 1, limit: take, totalPages: 0 },
        };
      }

      const ids = popularPropertyIds.map((p) => p.id);
      const properties = await prisma.property.findMany({
        where: { id: { in: ids } },
        // PERBAIKAN: Tambahkan include untuk facilities
        include: {
          images: { take: 1 },
          facilities: {
            take: 3, // Ambil 3 fasilitas utama
            include: {
              facility: true,
            },
          },
        },
      });
      const sortedProperties = ids
        .map((id) => properties.find((p) => p.id === id))
        .filter(Boolean);

      return {
        properties: sortedProperties,
        pagination: {
          total: sortedProperties.length,
          page: 1,
          limit: take,
          totalPages: 1,
        },
      };
    }

    // --- Logika untuk type=random ---
    if (type === 'random') {
      const allPropertyIds = await prisma.property.findMany({
        select: { id: true },
      });
      if (allPropertyIds.length === 0) {
        return {
          properties: [],
          pagination: { total: 0, page: 1, limit: take, totalPages: 0 },
        };
      }

      const shuffledIds = allPropertyIds.sort(() => Math.random() - 0.5);
      const randomIds = shuffledIds.slice(0, take).map((p) => p.id);
      const randomProperties = await prisma.property.findMany({
        where: { id: { in: randomIds } },
        // PERBAIKAN: Tambahkan include untuk facilities
        include: {
          images: { take: 1 },
          facilities: {
            take: 3,
            include: {
              facility: true,
            },
          },
        },
      });

      return {
        properties: randomProperties,
        pagination: {
          total: randomProperties.length,
          page: 1,
          limit: take,
          totalPages: 1,
        },
      };
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
    } else {
      orderByClause.created_at = 'desc';
    }

    const skip = (parseInt(page) - 1) * take;

    const [properties, totalProperties] = await prisma.$transaction([
      prisma.property.findMany({
        where,
        orderBy: orderByClause,
        take,
        skip,
        // PERBAIKAN: Tambahkan include untuk facilities
        include: {
          images: { take: 1 },
          facilities: {
            take: 3,
            include: {
              facility: true,
            },
          },
        },
      }),
      prisma.property.count({ where }),
    ]);

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

      for (const roomData of validatedData.rooms) {
        // Buat record Room untuk setiap item di array
        const newRoom = await tx.room.create({
          data: {
            property_id: property.id,
            name: roomData.name,
            base_price: roomData.base_price,
            max_guest: roomData.max_guest,
          },
        });

        // Jika ada URL gambar untuk kamar ini, buat record RoomImage
        if (roomData.imageUrl) {
          await tx.roomImage.create({
            data: {
              room_id: newRoom.id,
              image_url: roomData.imageUrl,
            },
          });
        }
      }

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

      return tx.property.findUnique({
        where: { id: property.id },
        include: {
          images: true,
          rooms: { include: { images: true } }, // Sertakan juga gambar kamar
          facilities: { include: { facility: true } },
        },
      });
    });

    return newProperty;
  }

  public async getPropertyById(propertyId: string) {
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
      include: {
        images: true,
        rooms: true,
        facilities: {
          include: {
            facility: true, // Sertakan detail nama fasilitas
          },
        },
        tenant: {
          include: {
            user: {
              select: {
                // Hanya pilih data user yang relevan dan aman
                name: true,
                photo_url: true,
              },
            },
          },
        },
      },
    });

    if (!property) {
      throw new ResponseError(404, 'Properti tidak ditemukan');
    }

    const reviewAggregate = await prisma.review.aggregate({
      where: {
        property_id: propertyId,
      },
      _count: {
        id: true, // Menghitung jumlah review
      },
      _avg: {
        rating: true, // Menghitung rata-rata dari kolom 'rating'
      },
    });
    // ----------------------------------------------------------------

    // Rakit objek respon akhir dengan data yang sudah lengkap
    const responseData = {
      ...property,
      location: `${property.city}, Indonesia`,
      tenant: property.tenant
        ? {
            user: {
              name: property.tenant.user.name,
              photo_url: property.tenant.user.photo_url,
            },
          }
        : null,
      // Gunakan hasil dari agregasi
      reviews: reviewAggregate._count.id,
      rating: reviewAggregate._avg.rating,
    };

    return responseData;
  }

  public async updateProperty(
    userId: string,
    propertyId: string,
    propertyData: UpdatePropertyInput,
  ) {
    const validatedData = Validation.validate(
      PropertyValidation.UPDATE,
      propertyData,
    );

    // 1. Verifikasi kepemilikan: Pastikan properti ini milik tenant yang sedang login.
    const propertyToUpdate = await prisma.property.findUnique({
      where: { id: propertyId },
      include: { tenant: true },
    });

    if (!propertyToUpdate) {
      throw new ResponseError(404, 'Properti tidak ditemukan.');
    }
    if (propertyToUpdate.tenant.user_id !== userId) {
      throw new ResponseError(
        403,
        'Forbidden: Anda tidak memiliki izin untuk mengedit properti ini.',
      );
    }

    // 2. Gunakan transaksi untuk update yang aman
    const updatedProperty = await prisma.$transaction(async (tx) => {
      await tx.property.update({
        where: { id: propertyId },
        data: {
          name: validatedData.name,
          description: validatedData.description,
          address: validatedData.address,
          city: validatedData.city,
          latitude: validatedData.latitude,
          longitude: validatedData.longitude,
          category: validatedData.category,
          lowest_price: Math.min(
            ...(validatedData.rooms?.map((r) => r.base_price) || [0]),
          ),
        },
      });

      // Ini adalah pendekatan paling sederhana dan tangguh.
      if (validatedData.imageUrls) {
        await tx.propertyImage.deleteMany({
          where: { property_id: propertyId },
        });
        await tx.propertyImage.createMany({
          data: validatedData.imageUrls.map((url: string) => ({
            property_id: propertyId,
            image_url: url,
          })),
        });
      }

      // c. Update fasilitas (pendekatan yang sama: hapus semua, buat baru)
      if (validatedData.facilityIds) {
        await tx.propertyFacility.deleteMany({
          where: { property_id: propertyId },
        });
        await tx.propertyFacility.createMany({
          data: validatedData.facilityIds.map((id: string) => ({
            property_id: propertyId,
            facility_id: id,
          })),
        });
      }

      if (validatedData.rooms && validatedData.rooms.length > 0) {
        // Hapus semua kamar yang ada untuk properti ini
        await tx.room.deleteMany({ where: { property_id: propertyId } });

        // Buat kembali semua kamar berdasarkan data baru dari frontend
        await tx.room.createMany({
          data: validatedData.rooms.map((room: RoomInput) => ({
            property_id: propertyId,
            name: room.name,
            base_price: room.base_price,
            max_guest: room.max_guest,
          })),
        });
      }

      // Ambil kembali data yang sudah ter-update untuk dikirim sebagai respon
      return tx.property.findUnique({
        where: { id: propertyId },
        include: {
          images: true,
          rooms: true,
          facilities: { include: { facility: true } },
        },
      });
    });

    return updatedProperty;
  }
}
