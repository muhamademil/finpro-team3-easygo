// components/features/reviews/ReviewCard.tsx
'use client';

import { useState } from 'react';
import type { Review } from '@/types/type';
import Image from 'next/image';
import { Building, Calendar, Star, Send } from 'lucide-react';
import Button from '@/components/Elements/Button';
import { Textarea } from '@/components/ui/textarea';

type ReviewCardProps = {
  review: Review;
  onReplySubmit: (reviewId: number, replyText: string) => Promise<void>;
};

export const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  onReplySubmit,
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReply = async () => {
    if (!replyText.trim()) return;
    setIsSubmitting(true);
    try {
      await onReplySubmit(review.id, replyText);
      setIsReplying(false); // Sembunyikan form setelah berhasil
    } catch (error) {
      console.error('Failed to submit reply:', error);
      alert('Gagal mengirim balasan.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border">
      <div className="flex flex-col md:flex-row gap-6">
        {/* Info Penulis & Properti */}
        <div className="w-full md:w-1/4 space-y-3 text-sm">
          <div className="flex items-center gap-3">
            <Image
              src={review.authorImageUrl}
              alt={review.authorName}
              width={40}
              height={40}
              className="rounded-full"
            />
            <p className="font-semibold text-gray-800">{review.authorName}</p>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <Building className="w-4 h-4" />
            <span>{review.property.name}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500">
            <Calendar className="w-4 h-4" />
            <span>
              {review.stayDate.start} - {review.stayDate.end}
            </span>
          </div>
        </div>

        {/* Isi Ulasan */}
        <div className="w-full md:w-3/4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                />
              ))}
            </div>
            <p className="text-xs text-gray-400">{review.createdAt}</p>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">{review.text}</p>

          {/* Bagian Balasan */}
          <div className="mt-4">
            {review.reply ? (
              // Jika sudah ada balasan
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="font-semibold text-sm text-gray-800">
                  {review.reply.author}
                </p>
                <p className="text-xs text-gray-500 mb-2">
                  {review.reply.createdAt}
                </p>
                <p className="text-sm text-gray-600">{review.reply.text}</p>
              </div>
            ) : isReplying ? (
              // Jika sedang membalas
              <div className="relative">
                <Textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder="Tulis balasan disini..."
                  className="pr-12"
                />
                <button
                  onClick={handleReply}
                  disabled={isSubmitting}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-300"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            ) : (
              // Jika belum ada balasan dan belum mode membalas
              <Button variant="outlined" onClick={() => setIsReplying(true)}>
                Reply
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
