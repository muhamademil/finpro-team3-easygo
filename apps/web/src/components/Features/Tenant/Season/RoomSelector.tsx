'use client';

import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import type { Room } from '@/types/type';

interface RoomSelectorProps {
  rooms: Room[];
  selectedRoom: string;
  onRoomChange: (roomId: string) => void;
}

export default function RoomSelector({
  rooms,
  selectedRoom,
  onRoomChange,
}: RoomSelectorProps) {
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  return (
    <Card className="p-6 mb-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Pilih Kamar</h3>
      <Select value={selectedRoom} onValueChange={onRoomChange}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Pilih kamar..." />
        </SelectTrigger>
        <SelectContent>
          {rooms.map((room) => (
            <SelectItem key={room.id} value={room.id}>
              <div className="flex justify-between items-center w-full">
                <span>{room.title}</span>
                <span className="text-sm text-gray-500 ml-4">
                  IDR {formatPrice(room.price)} • {room.maxGuests} tamu
                </span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </Card>
  );
}
