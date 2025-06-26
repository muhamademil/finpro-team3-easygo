import { Card } from '@/components/ui/card';
import Link from 'next/link';
import Image from 'next/image';
import { Category } from '@/lib/type';

type CategoryCardProps = {
  category: Category;
};

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  return (
    <Link href={category.href} className="block group">
      <Card className="justify-between py-0 rounded-xl overflow-hidden h-32 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold text-gray-800 font-fat ml-5">
            {category.name}
          </h3>
          <div className="relative w-30 h-30 flex-shrink-0">
            <Image
              src={category.image}
              alt={`Ilustrasi untuk ${category.name}`}
              fill
              className="object-contain transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </div>
      </Card>
    </Link>
  );
};
