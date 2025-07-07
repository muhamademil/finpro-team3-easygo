import { Category } from '@/types/type';
import { CategoryCard } from '../CategoryCard';

const categories: Category[] = [
  {
    id: 1,
    name: "Villa's",
    image:
      'https://res.cloudinary.com/dohpngcuj/image/upload/v1750706139/villa_xqndzg.png',
    href: '/search?category=villa',
  },
  {
    id: 2,
    name: 'Apartment',
    image:
      'https://res.cloudinary.com/dohpngcuj/image/upload/v1750706139/apart_psn1gj.png',
    href: '/search?category=apartment',
  },
  {
    id: 3,
    name: 'House',
    image:
      'https://res.cloudinary.com/dohpngcuj/image/upload/v1750706139/House_bawp83.png',
    href: '/search?category=house',
  },
];

export const CategorySection: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-8 sm:px-10 sm:py-10">
      <div className="mb-8">
        <h2 className="text-3xl font-semibold text-gray-900 font-fat">
          Kategori
        </h2>
        <p className="text-gray-600 max-w-2xl text-sm mt-1">
          Mau yang homey, mewah, atau unik? Pilih kategori sesuai selera,
          tinggal klik!
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((category) => (
          <CategoryCard key={category.id} category={category} />
        ))}
      </div>
    </section>
  );
};
