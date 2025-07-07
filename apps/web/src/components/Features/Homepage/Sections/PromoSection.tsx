'use client';

import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

const promos = [
  {
    id: 1,
    image:
      'https://res.cloudinary.com/dohpngcuj/image/upload/v1750758118/3124f3c5-acbd-4b3e-950d-252c1b4c4783-1745916147544-8b33f2e5d94f0a4f59f37f4ba7cd459b_n8h361.png',
    href: '/promo/1',
  },
  {
    id: 2,
    image:
      'https://res.cloudinary.com/dohpngcuj/image/upload/v1750758119/47a60f54-bbc4-461a-aa6d-1b7c10d8cee2-1750047903867-e5a3494b073ad103ee4d5affc1fdc2b2_s3rr7x.png',
    href: '/promo/2',
  },
  {
    id: 3,
    image:
      'https://res.cloudinary.com/dohpngcuj/image/upload/v1750758118/3f1b22a5-d141-40a5-aab3-1880d6d5269d-1723430554979-6c9d58f8282df9e6bdc476fb8dd21b7b_cqrv3l.png',
    href: '/promo/3',
  },
  {
    id: 4,
    image:
      'https://res.cloudinary.com/dohpngcuj/image/upload/v1750758118/3f1b22a5-d141-40a5-aab3-1880d6d5269d-1723430554979-6c9d58f8282df9e6bdc476fb8dd21b7b_cqrv3l.png',
    href: '/promo/4',
  },
];

export const PromoSection: React.FC = () => {
  return (
    <section className="container mx-auto px-4 py-10 sm:px-6 lg:px-10">
      <div className="flex flex-col lg:flex-row lg:items-start gap-8">
        <div className="lg:w-1/4 flex flex-col items-center lg:items-start text-center lg:text-left">
          <Image
            src="https://res.cloudinary.com/dohpngcuj/image/upload/v1750758198/promoIcon_wwecml.png"
            alt="Promo Tag"
            width={64}
            height={64}
            className="mb-2"
          />
          <h2 className="text-2xl sm:text-3xl font-semibold font-fat text-gray-900 leading-snug">
            Kuy, cek promo <br className="hidden sm:block" /> dulu baru booking!
          </h2>
        </div>

        <div className="lg:w-3/4 w-full">
          <Carousel opts={{ align: 'start' }} className="w-full">
            <CarouselContent>
              {promos.map((promo) => (
                <CarouselItem
                  key={promo.id}
                  className="basis-[75%] sm:basis-1/2 md:basis-1/3"
                >
                  <Link href={promo.href} className="block p-2">
                    <Card className="overflow-hidden rounded-xl py-0 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-100">
                      <CardContent className="aspect-video p-0">
                        <Image
                          src={promo.image}
                          alt={`Promo ${promo.id}`}
                          width={600}
                          height={400}
                          className="w-full h-full object-cover"
                        />
                      </CardContent>
                    </Card>
                  </Link>
                </CarouselItem>
              ))}
            </CarouselContent>

            <div className="flex justify-center items-start md:justify-start md:items-center gap-4 mt-6">
              <CarouselPrevious className="static translate-y-0" />
              <CarouselNext className="static translate-y-0" />
            </div>
          </Carousel>
        </div>
      </div>
    </section>
  );
};
