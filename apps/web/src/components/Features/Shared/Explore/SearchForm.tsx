'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { MapPin, Search } from 'lucide-react';
import {
  DateRangePicker,
  DateRange,
} from '@/components/Elements/Picker/DateRangePicker';
import {
  GuestPicker,
  GuestCount,
} from '@/components/Elements/Picker/GuestPicker';

// Tipe untuk suggestions, bisa dipindahkan ke file types nanti
type LocationSuggestion = {
  id: string;
  name: string;
  type: 'city' | 'area';
};

// Data dummy untuk suggestions, nanti bisa diganti dari API
const locationSuggestions: LocationSuggestion[] = [
  { id: '1', name: 'Bandung', type: 'city' },
  { id: '2', name: 'Jakarta', type: 'city' },
  { id: '3', name: 'Bali', type: 'city' },
  { id: '4', name: 'Lembang, Bandung', type: 'area' },
];

export default function SearchForm() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // --- Inisialisasi state dari URL search params ---
  const [location, setLocation] = useState(searchParams.get('city') || '');
  const [dateRange, setDateRange] = useState<DateRange>({
    startDate: searchParams.get('checkIn')
      ? new Date(searchParams.get('checkIn')!)
      : new Date(),
    endDate: searchParams.get('checkOut')
      ? new Date(searchParams.get('checkOut')!)
      : new Date(),
    key: 'selection',
  });
  const [guests, setGuests] = useState<GuestCount>({
    adults: Number(searchParams.get('guests')) || 2,
    children: 0, // Asumsi children tidak disimpan di URL untuk kesederhanaan
  });

  // State untuk UI suggestions
  const [showSuggestions, setShowSuggestions] = useState(false);
  const suggestionsRef = useRef<HTMLDivElement>(null);

  const handleSearch = () => {
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    // Update parameter berdasarkan state form
    current.set('city', location);
    current.set('checkIn', dateRange.startDate.toISOString().split('T')[0]);
    current.set('checkOut', dateRange.endDate.toISOString().split('T')[0]);
    current.set('guests', (guests.adults + guests.children).toString());
    current.set('page', '1'); // Selalu reset ke halaman 1 saat pencarian baru

    const search = current.toString();
    const query = search ? `?${search}` : '';

    router.push(`/explore${query}`);
  };

  // Menutup suggestions saat klik di luar
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        suggestionsRef.current &&
        !suggestionsRef.current.contains(event.target as Node)
      ) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* Location Input */}
        <div className="relative" ref={suggestionsRef}>
          <MapPin className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
          <Input
            type="text"
            placeholder="Mau ke mana?"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            className="pl-10"
          />
          {showSuggestions && (
            <div className="absolute top-full left-0 right-0 bg-white border rounded-lg shadow-lg z-50 mt-1 max-h-60 overflow-y-auto">
              {locationSuggestions
                .filter((s) =>
                  s.name.toLowerCase().includes(location.toLowerCase()),
                )
                .map((suggestion) => (
                  <div
                    key={suggestion.id}
                    onClick={() => {
                      setLocation(suggestion.name);
                      setShowSuggestions(false);
                    }}
                    className="px-4 py-3 hover:bg-gray-50 cursor-pointer flex items-center space-x-3"
                  >
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <div>
                      <div className="font-medium">{suggestion.name}</div>
                      <div className="text-sm text-gray-500 capitalize">
                        {suggestion.type}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Date Range Picker */}
        <DateRangePicker value={dateRange} onChange={setDateRange} />

        {/* Guest Picker */}
        <GuestPicker value={guests} onChange={setGuests} />

        {/* Search Button */}
        <Button
          onClick={handleSearch}
          className="bg-blue-600 hover:bg-blue-700 flex items-center justify-center"
        >
          <Search className="w-5 h-5 mr-2" />
          Ayo Cari
        </Button>
      </div>
    </div>
  );
}
