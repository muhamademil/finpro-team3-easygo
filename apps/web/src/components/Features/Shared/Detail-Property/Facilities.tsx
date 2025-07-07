'use client';

import type { Facility } from '@/types/detailProperty.types';
import {
  Wifi,
  ParkingSquare,
  Tv,
  Utensils,
  Wind,
  Droplets,
  Dumbbell,
  Webhook,
  WavesLadder,
  Cctv,
} from 'lucide-react';
import React from 'react';

// Kamus untuk memetakan nama fasilitas ke komponen ikon
const facilityIcons: Record<string, React.ReactNode> = {
  Wifi: <Wifi className="w-6 h-6 text-gray-800" />,
  'Free parking on premises': (
    <ParkingSquare className="w-6 h-6 text-gray-800" />
  ),
  Pool: <WavesLadder className="w-6 h-6 text-gray-800" />,
  Kitchen: <Utensils className="w-6 h-6 text-gray-800" />,
  'Hair dryer': <Webhook className="w-6 h-6 text-gray-800" />,
  'Air conditioning': <Wind className="w-6 h-6 text-gray-800" />,
  'Water heater': <Droplets className="w-6 h-6 text-gray-800" />,
  Gym: <Dumbbell className="w-6 h-6 text-gray-800" />,
  '43 inch TV with Netflix': <Tv className="w-6 h-6 text-gray-800" />,
  'Exterior security cameras on property': (
    <Cctv className="w-6 h-6 text-gray-800" />
  ),
};

interface FacilitiesProps {
  facilities: Facility[];
}

export default function Facilities({ facilities }: FacilitiesProps) {
  return (
    <div className="space-y-4 pt-8 border-t">
      <h2 className="text-2xl font-bold text-gray-900">Fasilitas Tersedia</h2>
      <div className="grid grid-cols-2 gap-4">
        {facilities.map((facility) => (
          <div key={facility.id} className="flex items-center space-x-4">
            {/* Ambil ikon dari kamus, atau gunakan ikon default jika tidak ada */}
            {facilityIcons[facility.name] || <div className="w-6 h-6" />}
            <span className="text-gray-700">{facility.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
