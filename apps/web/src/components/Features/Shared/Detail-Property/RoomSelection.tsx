'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Users } from 'lucide-react';
import Image from 'next/image';
import type { Room } from '@/types/detailProperty.types';

interface RoomSelectionProps {
  rooms: Room[];
  selectedRoom: Room | null;
  onRoomSelect: (room: Room) => void;
  propertyImage: string; // Tambahkan prop untuk gambar fallback
}

export default function RoomSelection({
  rooms,
  selectedRoom,
  onRoomSelect,
  propertyImage, // Terima gambar utama properti
}: RoomSelectionProps) {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    }).format(price);
  };

  return (
    <div className="space-y-4 pt-8 border-t">
      <h2 className="text-2xl font-bold text-gray-900">Pilih Kamar</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => {
          const isSelected = selectedRoom?.id === room.id;

          return (
            <Card
              key={room.id}
              className={`p-4 cursor-pointer transition-all flex flex-col ${
                isSelected
                  ? 'border-blue-500 bg-blue-50 ring-2 ring-blue-500'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
              onClick={() => onRoomSelect(room)}
            >
              <div className="relative w-full h-40 mb-4 rounded-lg overflow-hidden">
                <Image
                  src={propertyImage}
                  alt={room.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>

              <div className="space-y-2 flex-1 flex flex-col">
                <h3 className="font-semibold text-lg">{room.name}</h3>

                <div className="flex items-center text-sm text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  {/* PERBAIKAN: Gunakan `max_guest` dari API */}
                  <span>Maksimal {room.max_guest} tamu</span>
                </div>

                <div className="text-lg font-bold text-gray-900 pt-2 flex-1">
                  {/* PERBAIKAN: Gunakan `base_price` dari API */}
                  {formatPrice(room.base_price)}
                  <span className="text-sm font-normal text-gray-500">
                    {' '}
                    / malam
                  </span>
                </div>

                <Button
                  className={`w-full mt-2 ${
                    isSelected
                      ? 'bg-blue-600 hover:bg-blue-700'
                      : 'bg-white border border-blue-600 text-blue-600 hover:bg-blue-50'
                  }`}
                  onClick={(e) => {
                    e.stopPropagation(); // Ini sudah benar, untuk mencegah klik ganda
                    onRoomSelect(room);
                  }}
                >
                  {isSelected ? 'Terpilih' : 'Pilih Kamar'}
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
