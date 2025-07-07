'use client';

import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export default function Pagination({
  currentPage,
  totalPages,
}: PaginationProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Fungsi untuk mengubah parameter 'page' di URL
  const handlePageChange = (page: number) => {
    // Pastikan halaman yang dituju berada dalam rentang yang valid
    if (page < 1 || page > totalPages) {
      return;
    }

    // Buat salinan parameter yang ada saat ini dari URL
    const current = new URLSearchParams(Array.from(searchParams.entries()));

    // Atur parameter 'page' ke nilai yang baru
    current.set('page', String(page));

    // Buat query string baru dan arahkan pengguna
    const search = current.toString();
    router.push(`/explore?${search}`);
  };

  // Fungsi utilitas untuk menghitung halaman mana saja yang akan ditampilkan
  const getVisiblePages = () => {
    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    if (currentPage <= 4) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    }
    if (currentPage >= totalPages - 3) {
      return [
        1,
        '...',
        totalPages - 4,
        totalPages - 3,
        totalPages - 2,
        totalPages - 1,
        totalPages,
      ];
    }
    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages,
    ];
  };

  const visiblePages = getVisiblePages();

  // Jika hanya ada satu halaman atau tidak ada hasil, jangan tampilkan pagination
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div className="flex items-center justify-center space-x-2 mt-12">
      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-4 h-4" />
        <span className="ml-2 hidden sm:inline">Sebelumnya</span>
      </Button>

      {visiblePages.map((page, index) => (
        <div key={index}>
          {page === '...' ? (
            <span className="px-3 py-2 text-gray-500">...</span>
          ) : (
            <Button
              variant={currentPage === page ? 'default' : 'outline'}
              size="sm"
              onClick={() => handlePageChange(page as number)}
              className={
                currentPage === page
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'border-gray-300 text-gray-700 hover:bg-gray-50'
              }
            >
              {page}
            </Button>
          )}
        </div>
      ))}

      <Button
        variant="outline"
        size="sm"
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        <span className="mr-2 hidden sm:inline">Berikutnya</span>
        <ChevronRight className="w-4 h-4" />
      </Button>
    </div>
  );
}
