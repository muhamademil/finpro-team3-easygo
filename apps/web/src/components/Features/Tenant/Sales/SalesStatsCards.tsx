// components/features/penjualan/SalesStatsCards.tsx
// (Buat folder baru untuk kerapian)

import { Card, CardContent, CardHeader, CardTitle } from '@/src/components/ui/card';

type SalesStatsProps = {
  totalPendapatan: number;
  totalBookings: number;
  avgPerBooking: number;
  topProperty: string;
};

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(value);
};

export const SalesStatsCards: React.FC<SalesStatsProps> = ({
  totalPendapatan,
  totalBookings,
  avgPerBooking,
  topProperty,
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-500">
            Total Pendapatan
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">
            {formatCurrency(totalPendapatan)}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-500">
            Total Booking Selesai
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{totalBookings}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-500">
            Rata-rata per Booking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{formatCurrency(avgPerBooking)}</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm font-medium text-gray-500">
            Properti Paling Laris
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-xl font-bold">{topProperty}</p>
        </CardContent>
      </Card>
    </div>
  );
};
