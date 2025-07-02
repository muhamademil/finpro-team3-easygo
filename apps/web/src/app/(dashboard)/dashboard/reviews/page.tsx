// app/(dashboard)/dashboard/ulasan/page.tsx
'use client';

import { useState, useEffect, useMemo } from 'react';
import type { Review } from '@/lib/type';
import { ReviewStats } from '@/components/Features/Tenant/Review/ReviewStats';
import { ReviewCard } from '@/components/Features/Tenant/Review/ReviewCard';

// Data dummy untuk ulasan
const dummyReviews: Review[] = [
  {
    id: 1,
    authorName: 'Angela Putu Ayu',
    authorImageUrl: 'https://i.pravatar.cc/150?u=angela',
    property: { name: 'Villa in Canggu' },
    stayDate: { start: '06 Jun', end: '07 Jun 2025' },
    rating: 4,
    createdAt: '3 Minutes Ago',
    text: 'Se happy itu si sama hotel ini, dari awal kita datang kita di sambut hangat langsung di depan pas turun dari mobil sampai kita di antar untuk registrasi dan ke kamar...',
    reply: null,
  },
  {
    id: 2,
    authorName: 'Bayu Angga Putra',
    authorImageUrl: 'https://i.pravatar.cc/150?u=bayu',
    property: { name: 'Villa in Canggu' },
    stayDate: { start: '06 Jun', end: '07 Jun 2025' },
    rating: 5,
    createdAt: '3 Minutes Ago',
    text: 'Impeccable experience from the very first greetings until the last. Niche experience of checking-in: they did it casually whilst telling their passion of going green and sustainable tourism...',
    reply: {
      author: 'Narendra House',
      createdAt: '23 Minutes Ago',
      text: 'Hi, Bayu terima kasih atas reviewnya. kami senang mendengarnya. kami akan menunggu anda kembali dan menyambut dengan senang hati.',
    },
  },
];

export default function ReviewsPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch data saat komponen dimuat
  useEffect(() => {
    // Simulasi fetch API
    setIsLoading(true);
    setTimeout(() => {
      setReviews(dummyReviews);
      setIsLoading(false);
    }, 1000);
  }, []);

  // Logika untuk mengirim balasan (akan di-pass ke ReviewCard)
  const handleReplySubmit = async (reviewId: number, replyText: string) => {
    // Simulasi panggilan API untuk menyimpan balasan
    console.log(`Submitting reply for review ${reviewId}:`, replyText);
    await new Promise((res) => setTimeout(res, 500)); // Simulasi delay network

    // Update state secara lokal untuk refresh UI
    setReviews((prevReviews) =>
      prevReviews.map((review) =>
        review.id === reviewId
          ? {
              ...review,
              reply: {
                author: 'Narendra House',
                text: replyText,
                createdAt: 'Just Now',
              },
            }
          : review,
      ),
    );
  };

  // Menghitung statistik untuk dikirim ke komponen ReviewStats
  const stats = useMemo(() => {
    const total = reviews.length;
    if (total === 0)
      return {
        totalReviews: 0,
        averageRating: 0,
        distribution: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
      };

    const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
    const distribution = reviews.reduce(
      (acc, r) => {
        acc[r.rating as keyof typeof acc]++;
        return acc;
      },
      { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 },
    );

    return {
      totalReviews: total,
      averageRating: sum / total,
      distribution: distribution,
    };
  }, [reviews]);

  if (isLoading) return <div>Loading reviews...</div>;

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Reviews</h1>

      {/* Bagian Statistik */}
      <div className="mb-10">
        <ReviewStats {...stats} />
      </div>

      {/* Daftar Ulasan */}
      <div className="space-y-6">
        {reviews.map((review) => (
          <ReviewCard
            key={review.id}
            review={review}
            onReplySubmit={handleReplySubmit}
          />
        ))}
      </div>
    </div>
  );
}
