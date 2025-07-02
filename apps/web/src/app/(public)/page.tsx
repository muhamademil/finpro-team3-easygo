import Image from 'next/image';

import { HeroSearchForm } from '@/components/Features/Homepage/Sections/HeroSection';
import { HorizontalScrollingSection } from '@/components/Features/Homepage/Sections/HorizontalScrollingSection';

import { DestinationCard } from '@/components/Features/Homepage/DestinationCard';
import { Destination } from '@/lib/type';
import { DESTINATIONS } from '@/constants/destination';

import { PropertyCard } from '@/components/Features/Shared/PropertyCard';
import { Property } from '@/lib/type';

import { CategorySection } from '@/components/Features/Homepage/Sections/CategorySection';
import { FlashSaleSection } from '@/components/Features/Homepage/Sections/FlashSaleSection';
import { PromoSection } from '@/components/Features/Homepage/Sections/PromoSection';
import { WhyChooseUsSection } from '@/components/Features/Homepage/Sections/WhyChooseUsSection';
import { NewsletterSection } from '@/components/Features/Homepage/Sections/NewsletterSection';

//Dummy Data
import { properties } from '@/constants/dummy';
import { cheapProperties } from '@/constants/dummy';

export default function HomePage() {
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
        renderItem={(city) => <DestinationCard city={city} />}
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
        items={properties}
        renderItem={(property) => <PropertyCard property={property} />}
      />

      <CategorySection />

      <FlashSaleSection />

      <HorizontalScrollingSection<Property>
        title="Harga Murah"
        subtitle="Budget minim, vibes tetap maksimal! Pilihan properti terjangkau ada di sini."
        items={cheapProperties}
        renderItem={(property) => <PropertyCard property={property} />}
      />

      <PromoSection />

      <WhyChooseUsSection />

      <NewsletterSection />
    </>
  );
}
