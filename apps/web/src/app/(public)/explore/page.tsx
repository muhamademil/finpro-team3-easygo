import SearchForm from '@/components/Features/Shared/Explore/SearchForm';
import SearchResults from '@/components/Features/Shared/Explore/SearchResult';
import PropertyGrid from '@/components/Features/Shared/Explore/PropertyGrid';
import Pagination from '@/components/Features/Shared/Explore/Pagination';
import { searchPropertiesAPI } from '@/services/explore.service';
import type { SearchFilters } from '@/types/explore.types';

export default async function ExplorePage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const filters: SearchFilters = {
    location: (searchParams.city as string) || '',
    checkIn: (searchParams.checkIn as string) || '',
    checkOut: (searchParams.checkOut as string) || '',
    guests: Number(searchParams.guests) || 2,
    category: (searchParams.category as string) || 'all',
    sortBy: (searchParams.sortBy as string) || 'popularity_desc',
    page: Number(searchParams.page) || 1,
  };

  // 2. Panggil API dengan filter dari URL. Server yang bekerja, bukan client.
  const { properties, pagination } = await searchPropertiesAPI(filters);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <SearchForm />

        <SearchResults
          totalResults={pagination.total}
          location={filters.location}
        />

        <PropertyGrid properties={properties} />

        <Pagination
          currentPage={pagination.page}
          totalPages={pagination.totalPages}
        />
      </main>
    </div>
  );
}
