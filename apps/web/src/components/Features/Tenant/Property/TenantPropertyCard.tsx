// components/features/TenantPropertyCard.tsx
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
  }).format(property.price);

  const handleDelete = () => {
    // Logika untuk menghapus properti
    alert(`Menghapus properti: ${property.name}`);
  };

  return (
    <Card className="overflow-hidden shadow-md transition-shadow duration-300 hover:shadow-xl p-0">
      <div className="relative h-48 w-full">
        <Image
          src={property.image}
          alt={property.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <CardContent className="p-4 space-y-2">
        <h3 className="font-medium font-fat text-lg text-gray-900 truncate">
          {property.name}
        </h3>
        <div className="flex items-center gap-1.5 text-xs text-gray-500">
          <MapPin className="w-3.5 h-3.5" />
          <span>{property.location}</span>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="font-semibold text-gray-800">
            {property.rating.toFixed(1)}
          </span>
          <span className="text-gray-500">({property.reviews} reviews)</span>
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
