'use client';

import { Card, CardContent, CardFooter } from '@/components/ui/card';
import Image from 'next/image';
import { Star, MapPin } from 'lucide-react';
import type { Property } from '@/lib/type'; // Gunakan tipe terpusat
import Button from '@/components/Elements/Button';
import Link from 'next/link';

type TenantPropertyCardProps = {
  property: Property;
};

export const TenantPropertyCard: React.FC<TenantPropertyCardProps> = ({
  property,
}) => {
  const formattedPrice = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(property.lowest_price);

  const mainImage =
    property.images?.[0]?.image_url ||
    'https://placehold.co/400x300?text=No+Image';

  const handleDelete = () => {
    // Logika untuk menghapus properti
    alert(`Menghapus properti: ${property.name}`);
  };

  return (
    <Card className="overflow-hidden shadow-md transition-shadow duration-300 hover:shadow-xl py-0 gap-2">
      <div className="relative h-48 w-full">
        <Image
          src={mainImage}
          alt={property.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardContent className="space-y-2">
        <h3 className="font-medium font-fat text-lg text-gray-900 truncate">
          {property.name}
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <MapPin className="w-3.5 h-3.5" />
          <span className="truncate">{property.address}</span>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="font-semibold text-gray-800">
            {property.rating?.toFixed(1) ?? '0.0'}
          </span>
          <span className="text-gray-500">
            ({property.reviews ?? 0} Reviews)
          </span>
        </div>
        <p className="text-lg font-semibold font-fat text-gray-900 pt-2">
          {formattedPrice}
        </p>
      </CardContent>
      <CardFooter className="p-4 grid grid-cols-2 gap-3">
        {/* Tombol Edit akan mengarah ke halaman edit listing */}
        <Link href={`/dashboard/property/edit/${property.id}`}>
          <Button variant="outlined" className="w-full">
            Edit
          </Button>
        </Link>
        <Button variant="solid" onClick={handleDelete}>
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};
