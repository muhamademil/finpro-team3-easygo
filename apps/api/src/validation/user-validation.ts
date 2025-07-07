import { z, ZodType } from 'zod';

export class UserValidation {
  static readonly REGISTER: ZodType = z.object({
    email: z.string().email(),
    role: z.enum(['TRAVELLER', 'TENANT']),
  });

  static readonly COMPLETE_REGISTER: ZodType = z.object({
    token: z.string().min(1, 'Token tidak boleh kosong'),
    name: z.string().min(1, 'Nama tidak boleh kosong'),
    password: z.string().min(8, 'Password harus minimal 8 karakter'),
    phone: z.string().min(10, 'Nomor telepon tidak valid'),
    photo_url: z.string().url('URL foto tidak valid').optional(),
    city: z.string().min(1, 'Kota tidak boleh kosong').optional(),
    bank_account: z
      .string()
      .min(1, 'Nomor rekening tidak boleh kosong')
      .optional(),
    bank_account_name: z
      .string()
      .min(1, 'Nama rekening tidak boleh kosong')
      .optional(),
  });

  static readonly LOGIN: ZodType = z.object({
    email: z.string().email('Format email tidak valid'),
    password: z.string().min(1, 'Password tidak boleh kosong'),
  });

  static readonly FORGOT_PASSWORD: ZodType = z.object({
    email: z.string().email('Format email tidak valid'),
  });

  static readonly RESET_PASSWORD: ZodType = z.object({
    token: z.string().min(1, 'Token tidak boleh kosong'),
    newPassword: z.string().min(8, 'Password harus minimal 8 karakter'),
  });
}
