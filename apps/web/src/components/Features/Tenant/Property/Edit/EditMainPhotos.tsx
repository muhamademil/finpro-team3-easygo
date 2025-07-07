'use client';

import { useListingStore } from '@/stores/useListing.store';
import { ImageUploadBox } from '../Listing/ImageUploadBox';

export const EditMainPhotos = () => {
  // Ambil state dan actions yang relevan dari Zustand
  const { listingData, addMainPhoto, removeMainPhoto, errors } =
    useListingStore();

  const currentPhotos = listingData.mainPhotos;
  const requiredPhotos = 5;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-1">Foto Utama Properti</h2>
      <p className="text-sm text-gray-500 mb-4">
        Upload minimal 5 foto. Foto pertama akan menjadi gambar sampul (cover)
        pada halaman pencarian.
      </p>

      {/* Tampilkan pesan error jika ada */}
      {errors.mainPhotos && (
        <p className="text-sm text-red-600 mb-4">{errors.mainPhotos}</p>
      )}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {/* Tampilkan foto yang sudah ada */}
        {currentPhotos.map((file, index) => (
          <div key={index} className="relative">
            <ImageUploadBox
              initialFile={file}
              onFileSelect={() => {}} // Tidak ada aksi saat memilih file yang sudah ada
              onFileRemove={() => removeMainPhoto(index)}
            />
            {index === 0 && (
              <div className="absolute bottom-0 w-full bg-black/60 text-white text-xs text-center py-1 rounded-b-lg">
                Cover
              </div>
            )}
          </div>
        ))}

        {/* Tampilkan kotak upload kosong untuk sisa slot */}
        {Array.from({
          length: Math.max(0, requiredPhotos - currentPhotos.length),
        }).map((_, index) => (
          <ImageUploadBox
            key={`placeholder-${index}`}
            onFileSelect={addMainPhoto}
          />
        ))}
      </div>

      {/* Opsi untuk menambah lebih banyak foto jika sudah memenuhi syarat minimal */}
      {currentPhotos.length >= requiredPhotos && (
        <div className="text-center mt-6">
          {/* Di sini Anda bisa menambahkan input file tersembunyi yang dipicu oleh button ini */}
          <p className="text-sm text-gray-500">
            Anda sudah memenuhi syarat minimal. Anda bisa menambahkan lebih
            banyak foto jika diinginkan.
          </p>
          {/* <Button type="button" variant="secondary">Tambah Foto Lain</Button> */}
        </div>
      )}
    </section>
  );
};
