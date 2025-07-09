'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Property, Room as RoomType } from '@/types/type';
import { CalendarDayData } from '@/types/season.type';

// Impor komponen-komponen UI Anda
import PropertySelector from '@/components/Features/Tenant/Season/PropertySelector';
import RoomSelector from '@/components/Features/Tenant/Season/RoomSelector';
import Calendar from '@/components/Features/Tenant/Season/Calendar';
import PriceControlPanel from '@/components/Features/Tenant/Season/PriceControlPanel';

// Impor fungsi service API
import {
  getRoomsByPropertyAPI,
  getRoomCalendarDataAPI,
  saveCalendarOverridesAPI,
} from '@/services/season.service';

// Komponen ini menerima data properti awal dari Server Component
export default function SeasonClientPage({
  initialProperties,
}: {
  initialProperties: Property[];
}) {
  // --- STATE MANAGEMENT ---
  const [properties] = useState<Property[]>(initialProperties);
  const [selectedPropertyId, setSelectedPropertyId] = useState<string>(
    initialProperties[0]?.id || '',
  );

  const [rooms, setRooms] = useState<RoomType[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string>('');

  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarData, setCalendarData] = useState<CalendarDayData[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const [isRentalActive, setIsRentalActive] = useState(true);
  const [priceAdjustmentType, setPriceAdjustmentType] = useState('nominal');
  const [nominalAmount, setNominalAmount] = useState('');
  const [percentageAmount, setPercentageAmount] = useState('');

  const [isRoomsLoading, setIsRoomsLoading] = useState(false);
  const [isCalendarLoading, setIsCalendarLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // --- DATA FETCHING ---

  const fetchCalendarData = useCallback(async () => {
    if (!selectedRoomId) return;
    setIsCalendarLoading(true);
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const data = await getRoomCalendarDataAPI(selectedRoomId, month, year);
    setCalendarData(data);
    setIsCalendarLoading(false);
  }, [selectedRoomId, currentDate]);

  useEffect(() => {
    if (!selectedPropertyId) return;
    const fetchRooms = async () => {
      setIsRoomsLoading(true);
      const fetchedRooms = await getRoomsByPropertyAPI(selectedPropertyId);
      setRooms(fetchedRooms);
      if (fetchedRooms.length > 0) {
        setSelectedRoomId(fetchedRooms[0].id);
      } else {
        setSelectedRoomId('');
        setCalendarData([]);
      }
      setIsRoomsLoading(false);
    };
    fetchRooms();
  }, [selectedPropertyId]);

  useEffect(() => {
    fetchCalendarData();
  }, [fetchCalendarData]);

  // --- EVENT HANDLERS ---

  const handleDateSelect = (dateString: string, dayData?: CalendarDayData) => {
    setSelectedDate(dateString);
    const selectedRoom = rooms.find((r) => r.id === selectedRoomId);
    if (!selectedRoom) return;

    if (dayData) {
      setIsRentalActive(dayData.is_available);
      if (dayData.price !== selectedRoom.price) {
        setPriceAdjustmentType('nominal');
        setNominalAmount(String(dayData.price));
        setPercentageAmount('');
      } else {
        setNominalAmount('');
        setPercentageAmount('');
      }
    } else {
      setIsRentalActive(true);
      setNominalAmount('');
      setPercentageAmount('');
    }
  };

  // PERBAIKAN: Buat handler khusus untuk membersihkan input sebelum menyimpan ke state
  const handleNominalAmountChange = (value: string) => {
    const cleanedValue = value.replace(/\D/g, ''); // Hapus semua karakter non-digit
    setNominalAmount(cleanedValue);
  };

  const handleSave = async () => {
    if (!selectedDate || !selectedRoomId) return;

    setIsSaving(true);
    const selectedRoom = rooms.find((r) => r.id === selectedRoomId);
    if (!selectedRoom) {
      setIsSaving(false);
      return;
    }

    let finalPrice: number | undefined = undefined;

    if (isRentalActive) {
      if (priceAdjustmentType === 'nominal' && nominalAmount) {
        finalPrice = Number(nominalAmount); // Sekarang aman karena nominalAmount sudah bersih
      } else if (priceAdjustmentType === 'percentage' && percentageAmount) {
        finalPrice = selectedRoom.price * (1 + Number(percentageAmount) / 100);
      }
    }

    if (finalPrice === selectedRoom.price) {
      finalPrice = undefined;
    }

    try {
      await saveCalendarOverridesAPI({
        roomId: selectedRoomId,
        date: selectedDate,
        price: finalPrice,
        is_available: isRentalActive,
      });
      alert('Perubahan berhasil disimpan!');
      await fetchCalendarData();
    } catch (error) {
      alert('Gagal menyimpan perubahan.');
      console.error(error);
    } finally {
      setIsSaving(false);
    }
  };

  const selectedRoom = useMemo(
    () => rooms.find((r) => r.id === selectedRoomId),
    [rooms, selectedRoomId],
  );

  if (properties.length === 0) {
    return (
      <div className="text-center py-20">
        <h2 className="text-xl font-semibold">Anda belum memiliki properti.</h2>
        <p className="text-gray-500 mt-2">
          Silakan buat listing baru terlebih dahulu.
        </p>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Season Management</h1>
        <p className="text-gray-600 mt-1">
          Atur ketersediaan dan harga khusus untuk setiap kamar di properti
          Anda.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-8 items-start">
        <div className="w-full md:w-1/3 space-y-6">
          <PropertySelector
            properties={properties}
            selectedProperty={selectedPropertyId}
            onPropertyChange={setSelectedPropertyId}
          />
          {isRoomsLoading ? (
            <p className="text-sm text-gray-500 p-4">Loading rooms...</p>
          ) : (
            <RoomSelector
              rooms={rooms}
              selectedRoom={selectedRoomId}
              onRoomChange={setSelectedRoomId}
            />
          )}
        </div>

        <div className="w-full md:w-2/3">
          {selectedRoom ? (
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-start">
              <div className="xl:col-span-2">
                <Calendar
                  currentDate={currentDate}
                  onDateChange={setCurrentDate}
                  selectedDate={selectedDate}
                  onDateSelect={handleDateSelect}
                  calendarData={calendarData}
                  basePrice={selectedRoom.price}
                  loading={isCalendarLoading}
                />
              </div>
              <div className="sticky top-24">
                <PriceControlPanel
                  selectedDate={selectedDate}
                  basePrice={selectedRoom.price}
                  isRentalActive={isRentalActive}
                  onRentalActiveChange={setIsRentalActive}
                  priceAdjustmentType={priceAdjustmentType}
                  onPriceAdjustmentTypeChange={setPriceAdjustmentType}
                  nominalAmount={nominalAmount}
                  // PERBAIKAN: Berikan handler yang sudah membersihkan data
                  onNominalAmountChange={handleNominalAmountChange}
                  percentageAmount={percentageAmount}
                  onPercentageAmountChange={setPercentageAmount}
                  onSave={handleSave}
                  loading={isSaving}
                />
              </div>
            </div>
          ) : (
            <div className="text-center p-20 bg-gray-50 rounded-lg h-full flex items-center justify-center">
              <p className="text-gray-600">
                Pilih properti untuk mulai mengatur kalender.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
