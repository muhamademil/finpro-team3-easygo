import Image from 'next/image';
import Link from 'next/link';

import { HeroSearchForm } from '@/components/Features/Homepage/Sections/HeroSection';
import { HorizontalScrollingSection } from '@/components/Features/Homepage/Sections/HorizontalScrollingSection';

import { DestinationCard } from '@/components/Features/Homepage/DestinationCard';
import { Destination } from '@/types/type';
import { DESTINATIONS } from '@/constants/destination';

import { PropertyCard } from '@/components/Features/Shared/PropertyCard';
import { Property } from '@/types/type';

import { CategorySection } from '@/components/Features/Homepage/Sections/CategorySection';
import { PromoSection } from '@/components/Features/Homepage/Sections/PromoSection';
import { WhyChooseUsSection } from '@/components/Features/Homepage/Sections/WhyChooseUsSection';
import { NewsletterSection } from '@/components/Features/Homepage/Sections/NewsletterSection';

import {
  getBandungHitsAPI,
  getCheapPropertiesAPI,
  getRecommendedPropertiesAPI,
} from '@/services/homepage.service';

export default async function HomePage() {
  const [bandungHits, cheapProperties, recommendedProperties] =
    await Promise.all([
      getBandungHitsAPI(),
      getCheapPropertiesAPI(),
      getRecommendedPropertiesAPI(),
    ]);
  return (
    <>
      <HeroSearchForm />

      <HorizontalScrollingSection<Destination>
        icon={
          <Image
            src="https://res.cloudinary.com/dohpngcuj/image/upload/v1750674187/topdestination_op2jle.png"
            alt="Top Destination Icon"
            width={48}
            height={48}
          />
        }
        title="Top Destinasi"
        subtitle="Lagi jadi incaran banyak orang nih!"
        items={DESTINATIONS}
        renderItem={(city) => (
          <Link href={`/explore?city=${city.name}`}>
            <DestinationCard city={city} />
          </Link>
        )}
      />

      <HorizontalScrollingSection<Property>
        icon={
          <Image
            src="https://res.cloudinary.com/dohpngcuj/image/upload/v1750705248/HitsIcon_hcwhun.png"
            alt="Hits Icon"
            width={48}
            height={48}
          />
        }
        title="Hits di Bandung"
        subtitle="Spot paling dicari di Bandung! Bikin staycation kamu makin estetik dan asik."
        items={bandungHits}
        renderItem={(property) => <PropertyCard property={property} />}
      />

      <CategorySection />

      <HorizontalScrollingSection<Property>
        title="Rekomendasi Untukmu"
        subtitle="Temukan permata tersembunyi yang kami pilihkan khusus untukmu."
        items={recommendedProperties} // <-- Gunakan data dari API
        renderItem={(property) => <PropertyCard property={property} />}
      />

      <HorizontalScrollingSection<Property>
        title="Harga Murah"
        subtitle="Budget minim, vibes tetap maksimal! Pilihan properti terjangkau ada di sini."
        items={cheapProperties} // <-- Gunakan data dari API
        renderItem={(property) => <PropertyCard property={property} />}
      />

      <PromoSection />

      <WhyChooseUsSection />

      <NewsletterSection />
    </>
  );
}
