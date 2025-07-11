'use client';

import { InfoCard } from '@/components/Features/Tenant/Homepage/InfoCard';
import { useAuthStore } from '@/stores/useAuth.store';

const tipsData = [
  {
    title: 'Beranda',
    description:
      'Temukan info terbaru dan tips bermanfaat untuk menggunakan EasyGo.',
    imageSrc: '/path/to/image1.png',
    href: '/dashboard',
  },
  {
    title: 'Property',
    description:
      'Lihat dan kelola daftar properti yang kamu iklankan di EasyGo.',
    imageSrc: '/path/to/image2.png',
    href: '/dashboard/property',
  },
  {
    title: 'Season',
    description:
      'Atur harga khusus di tanggal tertentu atau nonaktifkan sewa sementara.',
    imageSrc: '/path/to/image3.png',
    href: '/dashboard/season',
  },
  {
    title: 'Penjualan',
    description:
      'Lihat laporan penjualan dari penyewaan properti kamu secara detail.',
    imageSrc: '/path/to/image4.png',
    href: '/dashboard/penjualan',
  },
  {
    title: 'Booking',
    description: 'Kelola pengajuan pemesanan dan pembayaran dari tamu di sini.',
    imageSrc: '/path/to/image5.png',
    href: '/dashboard/booking',
  },
  {
    title: 'Ulasan',
    description:
      'Lihat semua ulasan yang diberikan oleh tamu atas properti kamu.',
    imageSrc: '/path/to/image6.png',
    href: '/dashboard/ulasan',
  },
];

export default function DashboardHomePage() {
  const { user } = useAuthStore();
  return (
    <div>
      <h1 className="text-4xl font-medium font-fat text-gray-800">
        Selamat Datang, {user?.name}
      </h1>

      <div className="mt-8">
        <h2 className="text-2xl font-bold">Tips!</h2>
        <p className="text-gray-500 mt-1">
          Kenal lebih dekat yuk, dengan Dashboard Tenant!
        </p>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tipsData.map((tip) => (
            <InfoCard key={tip.title} {...tip} />
          ))}
        </div>
      </div>
    </div>
  );
}
