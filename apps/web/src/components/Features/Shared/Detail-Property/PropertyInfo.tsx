// components/Features/Shared/Detail-Property/PropertyInfo.tsx (Perbaikan)
'use client';

import { Star } from 'lucide-react';
import Image from 'next/image';

// PERBAIKAN #1: Sesuaikan tipe Host agar cocok dengan data dari API
interface Host {
  name: string | null;
  photo_url: string | null; // Menggunakan photo_url, bukan avatar
}

interface PropertyInfoProps {
  name: string;
  location: string;
  rating: number | null;
  reviewCount: number | null;
  host: Host;
}

export default function PropertyInfo({
  name,
  location,
  rating,
  reviewCount,
  host,
}: PropertyInfoProps) {
  return (
    <div className="space-y-4">
      <div>
        <p className="text-gray-600 mb-2">{location}</p>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{name}</h1>
        <div className="flex items-center space-x-2">
          <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
          <span className="font-semibold">{rating?.toFixed(1) ?? 'Baru'}</span>
          <span className="text-gray-600">({reviewCount ?? 0} ulasan)</span>
        </div>
      </div>

      <div className="flex items-center space-x-3 pt-4 border-t">
        <Image
          src={host.photo_url || '/placeholder.svg?width=56&height=56'}
          alt={host.name || 'Host'}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div>
          <p className="text-lg font-semibold">
            Disewakan oleh {host.name || 'Tuan Rumah'}
          </p>
        </div>
      </div>
    </div>
  );
}
