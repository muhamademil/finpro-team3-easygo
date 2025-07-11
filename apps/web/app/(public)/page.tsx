'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { HeroSearchForm } from '@/components/Features/Homepage/Sections/HeroSection';
import { HorizontalScrollingSection } from '@/components/Features/Homepage/Sections/HorizontalScrollingSection';

import { DestinationCard } from '@/components/Features/Homepage/DestinationCard';
import { DESTINATIONS } from '@/constants/destination';
import { CategorySection } from '@/components/Features/Homepage/Sections/CategorySection';
import { PromoSection } from '@/components/Features/Homepage/Sections/PromoSection';
import { WhyChooseUsSection } from '@/components/Features/Homepage/Sections/WhyChooseUsSection';
import { NewsletterSection } from '@/components/Features/Homepage/Sections/NewsletterSection';

import { Property } from '@/types/type';
import { PropertyCard } from '@/src/components/Features/Shared/PropertyCard';

import { getBandungHitsAPI, getCheapPropertiesAPI, getRecommendedPropertiesAPI } from '@/src/services/homepage.service';

export default function HomePage() {
  const [bandungHits, setBandungHits] = useState<Property[]>([]);
  const [cheapProperties, setCheapProperties] = useState<Property[]>([]);
  const [recommendedProperties, setRecommendedProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [hits, cheap, recommended] = await Promise.all([
          getBandungHitsAPI(),
          getCheapPropertiesAPI(),
          getRecommendedPropertiesAPI(),
        ]);
        setBandungHits(hits);
        setCheapProperties(cheap);
        setRecommendedProperties(recommended);
      } catch (error) {
        console.error('Gagal mengambil data homepage:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <>
      <HeroSearchForm />

      <HorizontalScrollingSection
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

      <HorizontalScrollingSection
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

      <HorizontalScrollingSection
        title="Rekomendasi Untukmu"
        subtitle="Temukan permata tersembunyi yang kami pilihkan khusus untukmu."
        items={recommendedProperties}
        renderItem={(property) => <PropertyCard property={property} />}
      />

      <HorizontalScrollingSection
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
