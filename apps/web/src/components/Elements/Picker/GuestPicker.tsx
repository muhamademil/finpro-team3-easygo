'use client';

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';

// Definisikan tipe untuk props yang diterima
export type GuestCount = {
  adults: number;
  children: number;
};

interface GuestPickerProps {
  value: GuestCount;
  onChange: (value: GuestCount) => void;
}

export const GuestPicker: React.FC<GuestPickerProps> = ({
  value,
  onChange,
}) => {
  // Fungsi untuk menangani perubahan jumlah tamu
  const handleAdultsChange = (amount: number) => {
    const newValue = value.adults + amount;
    if (newValue >= 1) {
      // Pastikan dewasa minimal 1
      onChange({ ...value, adults: newValue });
    }
  };

  const handleChildrenChange = (amount: number) => {
    const newValue = value.children + amount;
    if (newValue >= 0) {
      // Anak-anak bisa 0
      onChange({ ...value, children: newValue });
    }
  };

  return (
    <Popover className="relative w-full">
      {/* Tombol sekarang menampilkan nilai dari props */}
      <PopoverButton className="bg-gray-100 px-4 py-2 rounded-lg text-sm text-gray-700 w-full text-left flex items-center justify-between">
        {value.adults} Adults, {value.children} Child
      </PopoverButton>

      <PopoverPanel className="absolute z-10 mt-2 bg-white border shadow-lg rounded-lg p-4 w-64">
        <div className="space-y-4">
          {/* Adults */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700">Adults</span>
            <div className="flex items-center space-x-2">
              <button
                type="button" // Tambahkan type="button" agar tidak men-submit form
                onClick={() => handleAdultsChange(-1)}
                className="w-6 h-6 flex items-center justify-center border text-gray-700 rounded hover:bg-gray-200"
              >
                −
              </button>
              <span className="text-slate-700 text-sm px-1">
                {value.adults}
              </span>
              <button
                type="button"
                onClick={() => handleAdultsChange(1)}
                className="w-6 h-6 flex items-center justify-center border text-gray-700 rounded hover:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>

          {/* Children */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700">Children</span>
            <div className="flex items-center space-x-2">
              <button
                type="button"
                onClick={() => handleChildrenChange(-1)}
                className="w-6 h-6 flex items-center justify-center border text-gray-700 rounded hover:bg-gray-200"
              >
                −
              </button>
              <span className="text-slate-700 text-sm px-1">
                {value.children}
              </span>
              <button
                type="button"
                onClick={() => handleChildrenChange(1)}
                className="w-6 h-6 flex items-center justify-center border text-gray-700 rounded hover:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  );
};
