import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { Destination } from '@/lib/type';

type DestinationCardProps = {
  city: Destination;
};

export const DestinationCard: React.FC<DestinationCardProps> = ({ city }) => {
  return (
    <Card className="relative flex-shrink-0 w-[7.5rem] h-[10rem] md:w-40 md:h-52 xl:w-54 xl:h-66  rounded-2xl overflow-hidden group transform hover:scale-105 transition-transform duration-300">
      <Image
        src={city.image}
        alt={`Pemandangan di ${city.name}`}
        fill
        className="object-cover"
        sizes="(max-width: 768px) 120px, 160px"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>

      <div className="absolute bottom-0 left-0 p-3 md:p-4">
        <h3 className="text-white text-base md:text-lg font-bold">
          {city.name}
        </h3>
      </div>
    </Card>
  );
};
