import { z, ZodType } from 'zod';
import {
  CreatePropertyInput,
  UpdatePropertyInput,
} from '@/models/property.model';

const RoomSchema = z.object({
  name: z.string().min(3, 'Nama kamar minimal 3 karakter'),
  base_price: z.number().positive('Harga harus angka positif'),
  max_guest: z.number().int().positive('Jumlah tamu harus angka positif'),
});

export class PropertyValidation {
  static readonly CREATE: ZodType<CreatePropertyInput> = z.object({
    name: z.string().min(5, 'Nama properti minimal 5 karakter'),
    description: z.string().min(20, 'Deskripsi minimal 20 karakter'),
    address: z.string().min(10, 'Alamat minimal 10 karakter'),
    city: z.string().min(1, 'Kota tidak boleh kosong'),
    latitude: z.number(),
    longitude: z.number(),
    category: z.enum(['VILLA', 'APARTMENT', 'GUEST_HOUSE']),

    rooms: z.array(RoomSchema).min(1, 'Minimal harus ada 1 kamar'),

    facilityIds: z.array(z.string().uuid('ID fasilitas tidak valid')),

    imageUrls: z
      .array(z.string().url('URL gambar tidak valid'))
      .min(5, 'Minimal harus ada 5 gambar'),
  });

  static readonly UPDATE: ZodType<UpdatePropertyInput> = z.object({
    name: z.string().min(5, 'Nama properti minimal 5 karakter').optional(),
    description: z.string().min(20, 'Deskripsi minimal 20 karakter').optional(),
    address: z.string().min(10, 'Alamat minimal 10 karakter').optional(),
    city: z.string().min(1, 'Kota tidak boleh kosong').optional(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
    category: z.enum(['VILLA', 'APARTMENT', 'GUEST_HOUSE']).optional(),

    rooms: z.array(RoomSchema).min(1, 'Minimal harus ada 1 kamar').optional(),

    facilityIds: z
      .array(z.string().uuid('ID fasilitas tidak valid'))
      .optional(),

    imageUrls: z
      .array(z.string().url('URL gambar tidak valid'))
      .min(5, 'Minimal harus ada 5 gambar')
      .optional(),
  });
}
