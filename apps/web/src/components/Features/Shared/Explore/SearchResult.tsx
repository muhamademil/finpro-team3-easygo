'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Filter, ArrowUpDown } from 'lucide-react';

// Definisikan di luar komponen agar tidak dibuat ulang setiap render
const categories = [
  { value: 'all', label: 'Semua Kategori' },
  { value: 'VILLA', label: 'Villa' },
  { value: 'HOUSE', label: 'House' },
  { value: 'APARTMENT', label: 'Apartment' },
];

const sortOptions = [
  { value: 'popularity_desc', label: 'Paling Populer' },
  { value: 'price_asc', label: 'Harga Termurah' },
  { value: 'price_desc', label: 'Harga Tertinggi' },
  { value: 'rating_desc', label: 'Rating Tertinggi' },
];

interface SearchResultsProps {
  totalResults: number;
  location: string;
}

export default function SearchResults({
  totalResults,
  location,
}: SearchResultsProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Baca state saat ini langsung dari URL
  const currentCategory = searchParams.get('category') || 'all';
  const currentSortBy = `${searchParams.get('sortBy') || 'popularity'}_${searchParams.get('orderBy') || 'desc'}`;

  // Fungsi untuk mengubah parameter URL
  const handleFilterChange = (key: 'category' | 'sortBy', value: string) => {
    // Buat salinan parameter yang ada saat ini
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    if (key === 'sortBy') {
      const [sortBy, orderBy] = value.split('_');
      current.set('sortBy', sortBy);
      current.set('orderBy', orderBy);
    } else {
      // Untuk 'category'
      if (value === 'all') {
        // Hapus parameter kategori jika 'all' dipilih
        current.delete('category');
      } else {
        current.set(key, value);
      }
    }

    // Selalu reset ke halaman 1 saat filter diubah
    current.set('page', '1');

    // Buat query string baru dan arahkan pengguna
    const search = current.toString();
    router.push(`/explore?${search}`);
  };

  return (
    <div className="mb-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Hasil Pencarian</h1>
          <p className="text-gray-600">
            Ditemukan{' '}
            <span className="font-semibold text-blue-600">{totalResults}</span>{' '}
            properti di dekat{' '}
            <span className="font-semibold text-blue-600">
              {location || 'lokasi Anda'}
            </span>
          </p>
        </div>

        <div className="flex items-center space-x-3">
          {/* Tombol Filter (bisa Anda fungsikan nanti dengan modal/dialog) */}
          <Button
            variant="outline"
            size="sm"
            className="flex items-center space-x-2"
          >
            <Filter className="w-4 h-4" />
            <span>Filter</span>
          </Button>

          {/* PERBAIKAN: Gunakan `currentSortBy` dan `handleFilterChange` */}
          <Select
            value={currentSortBy}
            onValueChange={(value) => handleFilterChange('sortBy', value)}
          >
            <SelectTrigger className="w-48">
              <ArrowUpDown className="w-4 h-4 mr-2" />
              <SelectValue placeholder="Urutkan" />
            </SelectTrigger>
            <SelectContent>
              {sortOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="flex space-x-2">
        {/* PERBAIKAN: Gunakan `currentCategory` dan `handleFilterChange` */}
        {categories.map((category) => (
          <Button
            key={category.value}
            variant={
              currentCategory.toUpperCase() === category.value
                ? 'default'
                : 'outline'
            }
            size="sm"
            onClick={() => handleFilterChange('category', category.value)}
            className={
              currentCategory.toUpperCase() === category.value
                ? 'bg-blue-600 hover:bg-blue-700'
                : ''
            }
          >
            {category.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
