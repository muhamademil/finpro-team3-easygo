'use client';

import { useListingStore } from '@/stores/useListing.store';
import { ImageUploadBox } from '../Listing/ImageUploadBox';
import { Input } from '@/components/ui/input';
import Button from '@/components/Elements/Button';
import { Trash2 } from 'lucide-react';

export const EditRooms = () => {
  const { listingData, addRoom, removeRoom, updateRoomField, setRoomPhoto } =
    useListingStore();

  return (
    <section>
      <h2 className="text-2xl font-bold mb-1">Kamar</h2>
      <p className="text-sm text-gray-500 mb-6">
        Tambahkan detail untuk setiap tipe kamar yang Anda sewakan.
      </p>

      <div className="space-y-6">
        {listingData.rooms.map((room) => (
          <div
            key={room.id}
            className="p-6 border rounded-lg space-y-4 relative bg-white shadow-sm"
          >
            {/* Tombol Hapus Kamar */}
            {listingData.rooms.length > 1 && (
              <button
                type="button"
                onClick={() => removeRoom(room.id)}
                className="absolute top-4 right-4 text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              {/* Upload Foto Kamar */}
              <div>
                <label className="text-sm font-medium block mb-2">
                  Foto Kamar
                </label>
                <ImageUploadBox
                  onFileSelect={(file) => setRoomPhoto(room.id, file)}
                  initialFile={room.photo}
                  onFileRemove={() => setRoomPhoto(room.id, null)}
                />
              </div>

              {/* Detail Kamar */}
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Tipe Kamar</label>
                  <Input
                    value={room.title}
                    onChange={(e) =>
                      updateRoomField(room.id, 'title', e.target.value)
                    }
                    placeholder="Cth. Deluxe Room with Balcony"
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Kapasitas Tamu</label>
                  <Input
                    type="number"
                    value={room.maxGuests}
                    onChange={(e) =>
                      updateRoomField(
                        room.id,
                        'maxGuests',
                        parseInt(e.target.value) || 0,
                      )
                    }
                    className="mt-1"
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium">Harga per Malam</label>
              <Input
                type="number"
                value={room.price}
                onChange={(e) =>
                  updateRoomField(
                    room.id,
                    'price',
                    parseInt(e.target.value) || 0,
                  )
                }
                placeholder="Harga dalam IDR"
                className="mt-1"
              />
            </div>
          </div>
        ))}
      </div>

      {/* Tombol Tambah Kamar */}
      <Button
        type="button"
        variant="outlined"
        onClick={addRoom}
        className="mt-6"
      >
        + Tambah Tipe Kamar
      </Button>
    </section>
  );
};
