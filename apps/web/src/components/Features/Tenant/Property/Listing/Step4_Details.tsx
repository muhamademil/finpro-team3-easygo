'use client';

import { useListingStore } from '@/src/stores/useListing.store';
import { useEffect } from 'react';
import { ImageUploadBox } from './ImageUploadBox';
import { Input } from '@/src/components/ui/input';
import { Checkbox } from '@/src/components/ui/checkbox';
import Button from '@/src/components/Elements/Button';
import { Trash2 } from 'lucide-react';

export const Step4_Details = () => {
  const {
    listingData,
    addMainPhoto,
    removeMainPhoto,
    addRoom,
    removeRoom,
    updateRoomField,
    setRoomPhoto,
    toggleFacility,
    masterFacilities,
    fetchFacilities,
    errors,
  } = useListingStore();

  useEffect(() => {
    // Hanya fetch jika data belum ada, untuk menghindari panggilan berulang
    if (masterFacilities.length === 0) {
      fetchFacilities();
    }
  }, [fetchFacilities, masterFacilities.length]);

  return (
    <div className="w-full max-w-4xl mx-auto space-y-12">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Detail Properti Kamu</h1>
        <p className="text-gray-600 mt-2">
          Langkah terakhir! Lengkapi detail ini dan propertimu siap untuk
          disewa.
        </p>
      </div>

      {/* Upload Photo Utama */}
      <div>
        <h2 className="text-xl font-semibold mb-2">Upload Photo Utama</h2>
        <p className="text-sm text-gray-500 mb-4">
          Upload minimal 5 foto. Foto pertama akan menjadi cover.
        </p>
        {errors.mainPhotos && (
          <p className="text-sm text-red-600 mb-4">{errors.mainPhotos}</p>
        )}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {listingData.mainPhotos.map((file, index) => (
            <div key={index} className="relative">
              <ImageUploadBox
                initialFile={file}
                onFileSelect={() => {}}
                onFileRemove={() => removeMainPhoto(index)}
              />
            </div>
          ))}
          {Array.from({
            length: Math.max(0, 5 - listingData.mainPhotos.length),
          }).map((_, index) => (
            <ImageUploadBox key={index} onFileSelect={addMainPhoto} />
          ))}
        </div>
        {listingData.mainPhotos.length >= 5 && (
          <div className="text-center mt-4">
            {/* Logika untuk "Add More Photos" bisa dibuat lebih kompleks jika perlu */}
            <p className="text-sm text-gray-500">
              Tambahkan lebih banyak foto di halaman edit nanti.
            </p>
          </div>
        )}
      </div>

      {/* Rooms */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Rooms</h2>
        {errors.rooms && (
          <p className="text-sm text-red-600 mb-4">{errors.rooms}</p>
        )}
        <div className="space-y-6">
          {listingData.rooms.map((room) => {
            const isRoomInvalid = !room.title.trim() || room.price <= 0;
            return (
              <div
                key={room.id}
                className={`p-4 border rounded-lg space-y-4 relative transition-all ${
                  errors.rooms && isRoomInvalid
                    ? 'border-red-500 bg-red-50'
                    : 'border-gray-200'
                }`}
              >
                {listingData.rooms.length > 1 && (
                  <button
                    onClick={() => removeRoom(room.id)}
                    className="absolute top-2 right-2 text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-start">
                  <ImageUploadBox
                    onFileSelect={(file) => setRoomPhoto(room.id, file)}
                    initialFile={room.photo}
                    onFileRemove={() => setRoomPhoto(room.id, null)}
                  />
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium">Rooms Title</label>
                      <Input
                        value={room.title}
                        onChange={(e) =>
                          updateRoomField(room.id, 'title', e.target.value)
                        }
                        placeholder="Cth. Deluxe Room"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium">Max Guests</label>
                      <Input
                        type="number"
                        value={room.maxGuests}
                        onChange={(e) =>
                          updateRoomField(
                            room.id,
                            'maxGuests',
                            parseInt(e.target.value),
                          )
                        }
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Price</label>
                  <Input
                    type="number"
                    value={room.price}
                    onChange={(e) =>
                      updateRoomField(
                        room.id,
                        'price',
                        parseInt(e.target.value),
                      )
                    }
                    placeholder="Harga yang ditampilkan sebelum tax"
                  />
                </div>
              </div>
            );
          })}
        </div>
        <Button variant="outlined" onClick={addRoom} className="mt-4">
          Add More Rooms
        </Button>
      </div>

      {/* Fasilitas */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Fasilitas</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {masterFacilities.map((facility) => (
            <div key={facility.id} className="flex items-center space-x-2">
              <Checkbox
                id={facility.id}
                // Cek apakah ID fasilitas ini ada di dalam array pilihan pengguna
                checked={listingData.facilities.includes(facility.id)}
                // Panggil toggleFacility dengan ID saat dicentang/dihilangkan
                onCheckedChange={() => toggleFacility(facility.id)}
              />
              <label
                htmlFor={facility.id}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {facility.name} {/* Tampilkan nama fasilitas ke pengguna */}
              </label>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
