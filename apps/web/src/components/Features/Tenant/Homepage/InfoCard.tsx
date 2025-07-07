// components/features/InfoCard.tsx

import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

type InfoCardProps = {
  title: string;
  description: string;
  imageSrc: string;
  href: string;
};

export const InfoCard: React.FC<InfoCardProps> = ({
  title,
  description,
  imageSrc,
  href,
}) => {
  return (
    <Link href={href}>
      <Card className="overflow-hidden group hover:shadow-xl transition-shadow duration-300">
        <div className="relative w-full aspect-video bg-gray-100">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-bold text-lg text-gray-800">{title}</h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
};
