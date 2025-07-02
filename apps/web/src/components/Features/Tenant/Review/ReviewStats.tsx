// components/features/reviews/ReviewStats.tsx

import { Star } from 'lucide-react';

type RatingDistribution = {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
};

type ReviewStatsProps = {
  totalReviews: number;
  averageRating: number;
  distribution: RatingDistribution;
};

// Sub-komponen untuk satu bar rating
const RatingBar = ({
  rating,
  count,
  total,
}: {
  rating: number;
  count: number;
  total: number;
}) => {
  const percentage = total > 0 ? (count / total) * 100 : 0;
  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="flex items-center">
        {rating}{' '}
        <Star className="w-3 h-3 ml-1 text-yellow-400 fill-yellow-400" />
      </span>
      <div className="w-full bg-gray-200 rounded-full h-1.5">
        <div
          className="bg-yellow-400 h-1.5 rounded-full"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      <span className="w-6 text-right text-gray-500">{count}</span>
    </div>
  );
};

export const ReviewStats: React.FC<ReviewStatsProps> = ({
  totalReviews,
  averageRating,
  distribution,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
      <div className="text-center md:text-left">
        <p className="text-gray-600">Total Reviews</p>
        <p className="text-5xl font-bold text-gray-800">{totalReviews}</p>
      </div>
      <div className="text-center md:text-left">
        <p className="text-gray-600">Average Rating</p>
        <div className="flex items-center gap-2 justify-center md:justify-start">
          <p className="text-5xl font-bold text-gray-800">
            {averageRating.toFixed(1)}
          </p>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-6 h-6 ${i < Math.round(averageRating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="space-y-1">
        {(
          Object.keys(
            distribution,
          ).reverse() as unknown as (keyof RatingDistribution)[]
        ).map((key) => (
          <RatingBar
            key={key}
            rating={key}
            count={distribution[key]}
            total={totalReviews}
          />
        ))}
      </div>
    </div>
  );
};
