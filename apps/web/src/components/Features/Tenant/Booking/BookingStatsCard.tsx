// components/features/booking/BookingStatsCard.tsx
import { Card, CardContent } from '@/components/ui/card';
import type { LucideIcon } from 'lucide-react';

type BookingStatsCardProps = {
  title: string;
  count: number;
  icon: LucideIcon;
  color: string; // e.g., 'text-yellow-600 bg-yellow-100'
};

export const BookingStatsCard: React.FC<BookingStatsCardProps> = ({
  title,
  count,
  icon: Icon,
  color,
}) => {
  return (
    <Card>
      <CardContent className="p-4 flex items-center gap-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <p className="text-sm text-gray-500">{title}</p>
          <p className="text-2xl font-bold">{count}</p>
        </div>
      </CardContent>
    </Card>
  );
};
