import { getPropertyByIdAPI } from '@/services/property.service';
import { redirect } from 'next/navigation';
import { PropertyDetailClient } from '../PropertyDetailClient';

// Halaman ini sekarang adalah Server Component (tidak ada 'use client')
export default async function PropertyDetailPage({
  params,
}: {
  params: { id: string };
}) {
  // 1. Ambil data di sisi server saat halaman diminta
  const propertyData = await getPropertyByIdAPI(params.id);

  // 2. Jika properti tidak ditemukan, arahkan pengguna
  if (!propertyData) {
    return redirect('/not-found'); // atau halaman 404 kustom Anda
  }

  // 3. Berikan data yang sudah diambil ke komponen client sebagai props
  return <PropertyDetailClient property={propertyData} />;
}
