import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { MapPin, Star } from 'lucide-react';
import { Property } from '@/types/type';

type PropertyCardProps = {
  property: Property;
};

export const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <Card className="flex-shrink-0 w-48 xl:w-64 pt-0 overflow-hidden rounded-xl border shadow-sm transition-transform duration-300 hover:-translate-y-1">
      <div className="relative h-32 xl:h-48 w-full">
        <Image
          src={property.images[0]?.image_url}
          alt={property.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 256px"
        />
      </div>
      <CardContent className="pt-0 space-y-1">
        <h3 className="font-medium text-lg font-fat text-gray-800 truncate">
          {property.name}
        </h3>
        <div className="flex items-center gap-1 text-xs">
          <MapPin className="w-4 h-4" />
          <p className="text-xs text-gray-500">{property.location}</p>
        </div>
        <div className="flex items-center gap-1 text-xs">
          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
          <span className="font-bold text-gray-800">
            {property.rating?.toFixed(1) ?? 0}
          </span>
          <span className="text-gray-500">({property.reviews} reviews)</span>
        </div>
        <div className="mt-3">
          <p className="text-md font-semibold font-fat text-gray-900">
            {new Intl.NumberFormat('id-ID', {
              style: 'currency',
              currency: 'IDR',
              minimumFractionDigits: 0,
            }).format(property.lowest_price)}
          </p>
          <p className="text-xs text-gray-500">Belum Termasuk Pajak</p>
        </div>
      </CardContent>
    </Card>
  );
};
