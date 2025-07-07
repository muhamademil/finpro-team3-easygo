'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import {
  GuestPicker,
  GuestCount,
} from '@/components/Elements/Picker/GuestPicker';
import {
  DateRangePicker,
  DateRange,
} from '@/components/Elements/Picker/DateRangePicker';
import Button from '@/components/Elements/Button';

export const HeroSearchForm = () => {
  const router = useRouter();
  const [location, setLocation] = useState('Bandung');

  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const [guests, setGuests] = useState<GuestCount>({
    adults: 2,
    children: 0,
  });

  const handleSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Bangun query string dari semua state yang ada
    const params = new URLSearchParams();

    if (location) {
      params.append('city', location);
    }
    if (dateRange.startDate) {
      // Kirim tanggal dalam format YYYY-MM-DD
      params.append('checkIn', dateRange.startDate.toISOString().split('T')[0]);
    }
    if (dateRange.endDate) {
      params.append('checkOut', dateRange.endDate.toISOString().split('T')[0]);
    }
    if (guests.adults > 0) {
      params.append('guests', (guests.adults + guests.children).toString());
    }

    // Arahkan ke halaman explore dengan query yang sudah dibuat
    router.push(`/explore?${params.toString()}`);
  };

  return (
    <section className="relative w-full h-[65vh] md:h-[50vh] flex items-center justify-center">
      <Image
        src="https://res.cloudinary.com/dohpngcuj/image/upload/v1750666233/imagebg-homepage_aahsyi.png"
        alt="Pemandangan kota sebagai latar belakang"
        fill
        className="object-cover"
        priority
        quality={80}
      />
      <div className="absolute inset-0 bg-black/40 z-0 " />
      <div className="relative z-10 text-center text-white px-4 max-w-3xl mt-15">
        <h1 className="text-3xl md:text-5xl font-medium font-fat mb-2">
          Hai, kamu mau stay di mana?
        </h1>
        <p className="text-lg font-fat font-normal md:text-xl mb-8">
          Easy Booking. Easy Living
        </p>

        {/* Search Box */}

        <form
          onSubmit={handleSearch}
          className="bg-white rounded-2xl shadow-lg p-6 md:p-10 w-full max-w-5xl space-y-4 text-left relative"
        >
          <div className="flex absolute -top-5 left-1/2 -translate-x-1/2 items-center justify-center gap-2 bg-white px-2 rounded-lg shadow-md">
            <Image
              src="https://res.cloudinary.com/dohpngcuj/image/upload/v1750666366/iconRooms_homepage_f7pejx.png"
              alt="rooms"
              width={40}
              height={40}
            />
            <span className="font-medium text-gray-800 text-sm">Rooms</span>
          </div>

          {/* Search Fields */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-4">
            <div>
              <label className="text-gray-500 text-sm mb-1 block">
                Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="bg-gray-100 px-4 py-2 rounded-lg text-sm text-gray-700 w-full"
              />
            </div>

            <div className="relative">
              <label className="text-gray-500 text-sm mb-1 block">
                Duration
              </label>
              <DateRangePicker value={dateRange} onChange={setDateRange} />
            </div>

            <div>
              <label className="text-gray-500 text-sm mb-1 block">Guests</label>
              <GuestPicker value={guests} onChange={setGuests} />
            </div>
            <div className="flex items-end">
              <Button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-semibold"
              >
                Ayo Cari
              </Button>
            </div>
          </div>

          <div className="my-4 border-t border-dashed border-gray-200"></div>

          <p className="text-xs text-gray-600 mt-4 flex items-center gap-1">
            <span className="text-blue-500">💡</span>
            Yuk, cek sekarang ada promo apa aja yang bisa kamu pakai biar
            booking rooms jadi lebih hemat.
          </p>
        </form>
      </div>
    </section>
  );
};
