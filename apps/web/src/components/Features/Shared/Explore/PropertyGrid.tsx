import { Star, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import type { Property } from '@/types/explore.types';

interface PropertyGridProps {
  properties: Property[];
}

export default function PropertyGrid({ properties }: PropertyGridProps) {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  // Tampilan jika tidak ada properti yang ditemukan
  if (!properties || properties.length === 0) {
    return (
      <div className="text-center py-20 border-2 border-dashed rounded-lg">
        <h2 className="text-xl font-semibold text-gray-700">
          Oops! Properti tidak ditemukan.
        </h2>
        <p className="text-gray-500 mt-2">
          Coba ubah filter pencarian Anda atau kembali ke halaman utama.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      {properties.map((property) => {
        // PERBAIKAN: Ambil gambar langsung dari data API
        const mainImage =
          property.images?.[0]?.image_url || '/placeholder.svg?text=No+Image';
        const thumbnails = property.images?.slice(1, 4) || [];

        return (
          // PERBAIKAN: Bungkus seluruh kartu dengan Link
          <Link href={`/details/${property.id}`} key={property.id}>
            <Card className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer h-full flex flex-col">
              <div className="flex">
                {/* Image Gallery Section */}
                <div className="w-2/5 p-4">
                  <div className="relative h-48 mb-3 rounded-lg overflow-hidden">
                    <Image
                      src={mainImage}
                      alt={property.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-2">
                    {thumbnails.map((thumbnail, index) => (
                      <div
                        key={thumbnail.id}
                        className="relative h-16 rounded-lg overflow-hidden"
                      >
                        <Image
                          src={thumbnail.image_url}
                          alt={`${property.name} thumbnail ${index + 1}`}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Content Section */}
                <div className="w-3/5 p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="font-bold text-xl text-gray-900 mb-2 truncate">
                      {property.name}
                    </h3>
                    <div className="flex items-center text-gray-600 mb-3 text-sm">
                      <MapPin className="w-4 h-4 mr-2" />
                      <span>{property.city}</span>
                    </div>
                    <div className="flex items-center mb-4 text-sm">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400 mr-1" />
                      <span className="font-semibold">
                        {property.rating?.toFixed(1) ?? 'Baru'}
                      </span>
                      <span className="text-gray-600 ml-1">
                        ({property.reviews ?? 0} ulasan)
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 mb-4">
                      {/* PERBAIKAN: Mapping fasilitas dengan benar */}
                      {property.facilities.slice(0, 3).map(({ facility }) => (
                        <span
                          key={facility.id}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium"
                        >
                          {facility.name}
                        </span>
                      ))}
                      {property.facilities.length > 3 && (
                        <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs rounded-full font-medium">
                          +{property.facilities.length - 3} lainnya
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Price Section */}
                  <div className="text-right mt-auto">
                    {/* PERBAIKAN: Gunakan `lowest_price` dari API */}
                    <div className="text-2xl font-bold text-gray-900 mb-1">
                      {formatPrice(property.lowest_price)}
                    </div>
                    <div className="text-xs text-gray-500">
                      per malam (belum termasuk pajak)
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
}
