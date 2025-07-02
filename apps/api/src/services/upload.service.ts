import { v2 as cloudinary } from 'cloudinary';
import CONFIG from '@/config';

// Konfigurasi Cloudinary SDK dengan kredensial dari .env
cloudinary.config({
  cloud_name: CONFIG.CLOUDINARY_CLOUD_NAME,
  api_key: CONFIG.CLOUDINARY_API_KEY,
  api_secret: CONFIG.CLOUDINARY_API_SECRET,
});

export class UploadService {
  /**
   * Menghasilkan timestamp dan signature yang valid untuk
   * digunakan oleh frontend saat meng-upload langsung ke Cloudinary.
   * Ini adalah implementasi dari "Signed Uploads".
   */
  public getUploadSignature() {
    // Timestamp dalam detik, dibutuhkan oleh Cloudinary
    const timestamp = Math.round(new Date().getTime() / 1000);

    // Membuat signature menggunakan API Secret
    // Ini membuktikan bahwa permintaan upload berasal dari sumber terpercaya (backend Anda)
    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp,
      },
      CONFIG.CLOUDINARY_API_SECRET!,
    );

    return { timestamp, signature };
  }
}
