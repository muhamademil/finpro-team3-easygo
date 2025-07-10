'use client';

import { useListingStore } from '@/src/stores/useListing.store';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { Input } from '@/src/components/ui/input';
import { Textarea } from '@/src/components/ui/textarea';

export const Step3_Info = () => {
  const { listingData, setField, errors, clearErrors } = useListingStore();

  const MapPicker = useMemo(
    () =>
      dynamic(
        () =>
          import(
            '@/src/components/Features/Tenant/Property/Listing/MapPicker'
          ).then((mod) => mod.MapPicker),
        { ssr: false },
      ),
    [],
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (Object.keys(errors).length > 0) {
      clearErrors();
    }
    setField(e.target.name as keyof typeof listingData, e.target.value);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Info Properti Kamu</h1>
        <p className="text-gray-600 mt-2">
          Yuk lengkapi detail penting biar calon tamu tahu betapa nyamannya
          tempatmu. Tenang aja, alamat lengkap baru dibagikan setelah ada yang
          booking.
        </p>
      </div>

      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium">Place Title</label>
          <Input
            name="title"
            value={listingData.title}
            onChange={handleChange}
            placeholder="Contoh: Villa Nyaman Dekat Dago"
            className="mt-1"
          />
          {errors.title && (
            <p className="text-xs text-red-500 mt-1">{errors.title}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium">Description</label>
          <Textarea
            name="description"
            value={listingData.description}
            onChange={handleChange}
            placeholder="Ceritain apa yang bikin tempatmu spesial..."
            className="mt-1"
          />
          {errors.title && (
            <p className="text-xs text-red-500 mt-1">{errors.description}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium">Address</label>
          <Input
            name="address"
            value={listingData.address}
            onChange={handleChange}
            placeholder="Masukin alamat lengkap..."
            className="mt-1"
          />
          {errors.title && (
            <p className="text-xs text-red-500 mt-1">{errors.address}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium">City</label>
          <Input
            name="city"
            value={listingData.city}
            onChange={handleChange}
            placeholder="Masukin alamat lengkap..."
            className="mt-1"
          />
          {errors.title && (
            <p className="text-xs text-red-500 mt-1">{errors.city}</p>
          )}
        </div>
        <div>
          <label className="text-sm font-medium">
            ✔️ Tunjukkan Lokasimu Secara Spesifik
          </label>
          <p className="text-xs text-gray-500 mb-2">
            Biar tamu gak nyasar, infokan lokasi kamu dengan jelas. Tapi tenang,
            alamat lengkap cuma dibagikan ke tamu setelah mereka melakukan
            reservasi.
          </p>
          <MapPicker />
        </div>
      </div>
    </div>
  );
};
