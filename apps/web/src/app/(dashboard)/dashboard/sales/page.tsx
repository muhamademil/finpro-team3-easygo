// app/(dashboard)/dashboard/penjualan/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Filter } from 'lucide-react';

// Impor komponen baru kita
import { SalesStatsCards } from '@/components/Features/Tenant/Sales/SalesStatsCards';
import { SalesChart } from '@/components/Features/Tenant/Sales/SalesChart';

// ... (Definisi tipe ChartData dan data dummy tetap di sini untuk sementara)
type ChartData = {
  name: string; // misal: 'Jan', 'Feb', 'Mar'
  pendapatan: number;
};

// Data dummy (nantinya ini akan di-fetch dari API berdasarkan filter)
const dummyMonthlyData: ChartData[] = [
  { name: 'Jan', pendapatan: 0 },
  { name: 'Feb', pendapatan: 2_000_000 },
  { name: 'Mar', pendapatan: 5_000_000 },
  { name: 'Apr', pendapatan: 5_500_000 },
  { name: 'May', pendapatan: 4_000_000 },
  { name: 'Jun', pendapatan: 8_000_000 },
  { name: 'Jul', pendapatan: 5_000_000 },
  { name: 'Aug', pendapatan: 6_000_000 },
  { name: 'Sep', pendapatan: 6_000_000 },
  { name: 'Nov', pendapatan: 7_500_000 },
  { name: 'Okt', pendapatan: 5_000_000 },
  { name: 'Des', pendapatan: 9_000_000 },
];

export default function PenjualanPage() {
  const [timeframe, setTimeframe] = useState('month');
  //   const [chartData, setChartData] = useState<ChartData[]>([]); // Ganti 'any' dengan tipe data chart Anda
  //   const [statsData, setStatsData] = useState({ /* ... data stats ... */ });

  useEffect(() => {
    // Simulasi fetch data
    console.log(`Fetching data for timeframe: ${timeframe}`);
    // API call di sini akan mengembalikan data untuk stats dan chart
    // const { stats, chart } = await fetchSalesData(timeframe);
    // setStatsData(stats);
    // setChartData(chart);
  }, [timeframe]);

  return (
    <div>
      {/* Header Halaman */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Laporan Keuangan</h1>
        <Select value={timeframe} onValueChange={setTimeframe}>
          <SelectTrigger className="w-[180px]">
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              <SelectValue placeholder="Pilih Periode" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="day">Per Hari</SelectItem>
            <SelectItem value="month">Per Bulan</SelectItem>
            <SelectItem value="year">Per Tahun</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Gunakan komponen Stats Cards */}
      <div className="mb-8">
        <SalesStatsCards
          totalPendapatan={57200000}
          totalBookings={58}
          avgPerBooking={986206}
          topProperty="Villa Nuansa"
        />
      </div>

      {/* Gunakan komponen Chart */}
      <Card>
        <CardContent className="pt-6">
          <SalesChart data={dummyMonthlyData} />
        </CardContent>
      </Card>
    </div>
  );
}
