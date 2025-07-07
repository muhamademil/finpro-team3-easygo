'use client';

import { useEffect } from 'react';
import { useListingStore } from '@/stores/useListing.store';
import { Checkbox } from '@/components/ui/checkbox';

export const EditFacilities = () => {
  // Ambil state dan actions yang relevan dari Zustand
  const { listingData, toggleFacility, masterFacilities, fetchFacilities } =
    useListingStore();

  // useEffect untuk mengambil daftar master fasilitas dari API
  // saat komponen pertama kali dimuat, jika belum ada.
  useEffect(() => {
    if (masterFacilities.length === 0) {
      fetchFacilities();
    }
  }, [fetchFacilities, masterFacilities.length]);

  return (
    <section>
      <h2 className="text-2xl font-bold mb-1">Fasilitas</h2>
      <p className="text-sm text-gray-500 mb-6">
        Pilih semua fasilitas yang tersedia di properti Anda.
      </p>

      {masterFacilities.length === 0 ? (
        <p>Loading fasilitas...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-4">
          {/* Mapping dari master list fasilitas */}
          {masterFacilities.map((facility) => (
            <div key={facility.id} className="flex items-center space-x-3">
              <Checkbox
                id={`facility-${facility.id}`}
                // 'checked' jika ID fasilitas ada di dalam array pilihan pengguna
                checked={listingData.facilities.includes(facility.id)}
                // Panggil action 'toggleFacility' dengan ID saat di-klik
                onCheckedChange={() => toggleFacility(facility.id)}
              />
              <label
                htmlFor={`facility-${facility.id}`}
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                {facility.name}
              </label>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
