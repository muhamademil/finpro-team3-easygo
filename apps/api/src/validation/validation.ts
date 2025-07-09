import { ZodType, ZodError } from 'zod';
import { ResponseError } from '../error/response.error';

export class Validation {
  static validate<T>(schema: ZodType, data: T): T {
    try {
      return schema.parse(data); // Gunakan .parse() yang akan melempar error Zod
    } catch (error) {
      if (error instanceof ZodError) {
        // Jika error dari Zod, kita lempar ResponseError dengan status 400
        throw new ResponseError(400, error.issues[0].message); // Ambil pesan error pertama
      }
      // Untuk error tak terduga lainnya
      throw new ResponseError(500, 'Internal Server Error');
    }
  }
}
