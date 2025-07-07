'use client';

import { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar, Users, Info, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Room, BookingDetails } from '@/types/detailProperty.types';
import {
  getRoomAvailabilityAPI,
  RoomAvailabilityData,
} from '@/services/room.service';

interface BookingCardProps {
  basePrice: number;
  selectedRoom: Room | null;
  bookingDetails: BookingDetails;
  onBookingChange: (details: Partial<BookingDetails>) => void;
}

interface CalendarDay {
  date: Date;
  price: number;
  isAvailable: boolean;
  isSelected: boolean;
  isCheckIn: boolean;
  isCheckOut: boolean;
  isBetween: boolean;
  isPast: boolean;
  isToday: boolean;
}

export default function BookingCard({
  basePrice,
  selectedRoom,
  onBookingChange,
  bookingDetails,
}: BookingCardProps) {
  const [showCalendar, setShowCalendar] = useState(false);
  const [checkInDate, setCheckInDate] = useState<Date | null>(null);
  const [checkOutDate, setCheckOutDate] = useState<Date | null>(null);
  const [guests, setGuests] = useState(2);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());
  const [availability, setAvailability] = useState<RoomAvailabilityData[]>([]);
  const [isLoadingCalendar, setIsLoadingCalendar] = useState(false);

  useEffect(() => {
    if (!selectedRoom || !showCalendar) return;

    const fetchAvailability = async () => {
      setIsLoadingCalendar(true);
      const month = currentCalendarDate.getMonth() + 1;
      const year = currentCalendarDate.getFullYear();
      const data = await getRoomAvailabilityAPI(selectedRoom.id, month, year);
      setAvailability(data);
      setIsLoadingCalendar(false);
    };

    fetchAvailability();
  }, [selectedRoom, currentCalendarDate, showCalendar]);

  const formatPrice = (price: number): string =>
    new Intl.NumberFormat('id-ID').format(price);
  const formatDate = (date: Date): string =>
    date.toLocaleDateString('id-ID', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  const formatMonthYear = (date: Date): string =>
    date.toLocaleDateString('id-ID', { month: 'long', year: 'numeric' });

  const generateCalendar = (): (CalendarDay | null)[] => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const year = currentCalendarDate.getFullYear();
    const month = currentCalendarDate.getMonth();

    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const startingDayOfWeek = firstDayOfMonth.getDay();

    // Buat "peta" untuk akses cepat ke data ketersediaan
    const availabilityMap = new Map(availability.map((a) => [a.date, a]));
    const days: (CalendarDay | null)[] = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split('T')[0]; // Format YYYY-MM-DD

      const dayData = availabilityMap.get(dateString);
      const isAvailable = dayData?.is_available ?? false; // Default tidak tersedia jika tidak ada di data
      const price = dayData?.price ?? selectedRoom?.base_price ?? basePrice;

      const isPast = date < today;
      const isToday = date.getTime() === today.getTime();
      const isCheckIn = checkInDate && date.getTime() === checkInDate.getTime();
      const isCheckOut =
        checkOutDate && date.getTime() === checkOutDate.getTime();
      const isBetween =
        checkInDate &&
        checkOutDate &&
        date > checkInDate &&
        date < checkOutDate;

      days.push({
        date,
        price,
        isAvailable,
        isSelected: !!(isCheckIn || isCheckOut),
        isCheckIn: !!isCheckIn,
        isCheckOut: !!isCheckOut,
        isBetween: !!isBetween,
        isPast,
        isToday,
      });
    }
    return days;
  };

  const handleDateClick = (day: CalendarDay) => {
    if (!day.isAvailable || day.isPast) return;

    if (!checkInDate || (checkInDate && checkOutDate)) {
      // Set check-in date
      setCheckInDate(day.date);
      setCheckOutDate(null);
    } else if (day.date > checkInDate) {
      // Set check-out date
      setCheckOutDate(day.date);
    } else {
      // Reset if selected date is before check-in
      setCheckInDate(day.date);
      setCheckOutDate(null);
    }
  };

  //   const handleMonthChange = (direction: 'prev' | 'next') => {
  //     const newDate = new Date(currentCalendarDate);
  //     if (direction === 'prev') {
  //       newDate.setMonth(currentCalendarDate.getMonth() - 1);
  //     } else {
  //       newDate.setMonth(currentCalendarDate.getMonth() + 1);
  //     }
  //     setCurrentCalendarDate(newDate);
  //   };

  const handleMonthChange = (direction: 'prev' | 'next') => {
    setCurrentCalendarDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  const calculatePriceBreakdown = () => {
    if (!selectedRoom || !checkInDate || !checkOutDate) return null;

    const availabilityMap = new Map(availability.map((a) => [a.date, a]));
    const daysInRange: { price: number }[] = [];
    const currentDate = new Date(checkInDate);

    while (currentDate < checkOutDate) {
      const dateString = currentDate.toISOString().split('T')[0];
      const dayData = availabilityMap.get(dateString);
      const price = dayData?.price ?? selectedRoom.base_price;
      daysInRange.push({ price });
      currentDate.setDate(currentDate.getDate() + 1);
    }

    if (daysInRange.length === 0) return null;

    const roomPrice = daysInRange.reduce((total, day) => total + day.price, 0);
    const serviceFee = Math.round(roomPrice * 0.05);
    const tax = Math.round(roomPrice * 0.11);
    const total = roomPrice + serviceFee + tax;

    return { roomPrice, serviceFee, tax, total, nights: daysInRange.length };
  };

  //   const calculatePriceBreakdown = () => {
  //     if (!selectedRoom || !checkInDate || !checkOutDate) return null;

  //     // Calculate price for each day in the range
  //     const days: CalendarDay[] = [];
  //     const currentDate = new Date(checkInDate);

  //     while (currentDate < checkOutDate) {
  //       const isWeekend =
  //         currentDate.getDay() === 0 || currentDate.getDay() === 6;
  //       const baseRoomPrice = selectedRoom.base_price;
  //       const price = isWeekend ? Math.round(baseRoomPrice * 1.3) : baseRoomPrice;

  //       days.push({
  //         date: new Date(currentDate),
  //         price,
  //         isAvailable: true,
  //         isSelected: false,
  //         isCheckIn: false,
  //         isCheckOut: false,
  //         isBetween: false,
  //         isPast: false,
  //         isToday: false,
  //       });

  //       currentDate.setDate(currentDate.getDate() + 1);
  //     }

  //     const roomPrice = days.reduce((total, day) => total + day.price, 0);
  //     const serviceFee = Math.round(roomPrice * 0.05);
  //     const tax = Math.round(roomPrice * 0.11);
  //     const total = roomPrice + serviceFee + tax;

  //     return {
  //       roomPrice,
  //       serviceFee,
  //       tax,
  //       total,
  //       nights: days.length,
  //     };
  //   };

  const priceBreakdown = useMemo(calculatePriceBreakdown, [
    checkInDate,
    checkOutDate,
    selectedRoom,
    availability,
  ]);
  const calendarDays = useMemo(generateCalendar, [
    currentCalendarDate,
    availability,
    selectedRoom?.base_price,
    basePrice,
    checkInDate,
    checkOutDate,
  ]);

  const handleBookingConfirm = () => {
    onBookingChange({
      checkIn: checkInDate,
      checkOut: checkOutDate,
      guests: guests,
      selectedRoom: selectedRoom,
    });
    setShowConfirmation(true);
  };

  const handleFinalBooking = () => {
    console.log('Booking confirmed for:', bookingDetails);
    setShowConfirmation(false);
    // Di sini Anda akan memanggil API untuk membuat booking
  };

  //   const canNavigateToPrevMonth = () => {
  //     const today = new Date();
  //     const prevMonth = new Date(currentCalendarDate);
  //     prevMonth.setMonth(currentCalendarDate.getMonth() - 1);

  //     // Allow navigation to previous month if it contains future dates
  //     return (
  //       prevMonth.getFullYear() > today.getFullYear() ||
  //       (prevMonth.getFullYear() === today.getFullYear() &&
  //         prevMonth.getMonth() >= today.getMonth())
  //     );
  //   };

  return (
    <>
      <Card className="p-6 space-y-6">
        {/* Price Header */}
        <div className="flex items-center justify-between">
          <div>
            <div className="text-2xl font-semibold font-fat">
              IDR {formatPrice(selectedRoom?.base_price || basePrice)}
              <span className="text-base font-normal text-gray-600">
                {' '}
                / night
              </span>
            </div>
            <div className="flex items-center text-sm text-gray-600 mt-1">
              <Info className="w-4 h-4 mr-1" />
              <span>Harga belum termasuk pajak</span>
            </div>
          </div>
        </div>

        {/* Booking Form */}
        <div className="space-y-4">
          {/* Combined Date Picker */}
          <div>
            <Label className="text-sm font-medium">Check-in & Check-out</Label>
            <div
              className="relative cursor-pointer"
              onClick={() => setShowCalendar(true)}
            >
              <Input
                readOnly
                value={
                  checkInDate && checkOutDate
                    ? `${formatDate(checkInDate)} - ${formatDate(checkOutDate)}`
                    : 'Pilih tanggal'
                }
                className="pl-10 cursor-pointer"
                placeholder="Pilih tanggal check-in dan check-out"
              />
              <Calendar className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            </div>
          </div>

          {/* Guests */}
          <div>
            <Label htmlFor="guests" className="text-sm font-medium">
              Guests
            </Label>
            <div className="relative">
              <Input
                id="guests"
                type="number"
                min="1"
                max={selectedRoom?.max_guest || 10}
                value={guests}
                onChange={(e) => {
                  const value = Number.parseInt(e.target.value);
                  setGuests(value);
                  onBookingChange({ guests: value });
                }}
                className="pl-10"
              />
              <Users className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            </div>
          </div>
        </div>

        {/* Room Selection Message or Price Breakdown */}
        {!selectedRoom ? (
          <div className="bg-gray-50 p-4 rounded-lg text-center">
            <p className="text-gray-600">Silahkan pilih room yang tersedia</p>
          </div>
        ) : (
          <div className="space-y-3">
            <h3 className="font-semibold">Price Breakdown</h3>

            {priceBreakdown ? (
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Rooms ({priceBreakdown.nights} nights)</span>
                  <span>IDR {formatPrice(priceBreakdown.roomPrice)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Service Fee (5%)</span>
                  <span>IDR {formatPrice(priceBreakdown.serviceFee)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Taxes & Fees (11%)</span>
                  <span>IDR {formatPrice(priceBreakdown.tax)}</span>
                </div>

                <hr className="my-2" />

                <div className="flex justify-between font-semibold text-base">
                  <span>Total</span>
                  <span>IDR {formatPrice(priceBreakdown.total)}</span>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-600">
                Pilih tanggal untuk melihat total harga
              </p>
            )}
          </div>
        )}

        {/* Booking Button */}
        <Button
          className="w-full bg-blue-600 hover:bg-blue-700"
          disabled={!selectedRoom || !checkInDate || !checkOutDate}
          onClick={handleBookingConfirm}
        >
          Lanjut Pembayaran
        </Button>

        {selectedRoom && (
          <p className="text-xs text-gray-500 text-center">
            Anda akan dikenakan biaya setelah langkah berikutnya
          </p>
        )}
      </Card>

      {/* Calendar Modal */}
      <Dialog open={showCalendar} onOpenChange={setShowCalendar}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Pilih Tanggal</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleMonthChange('prev')}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <h3 className="text-lg font-semibold">
                {formatMonthYear(currentCalendarDate)}
              </h3>
              <Button
                variant="outline"
                size="icon"
                onClick={() => handleMonthChange('next')}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
            {isLoadingCalendar ? (
              <div className="text-center p-10">Loading ketersediaan...</div>
            ) : (
              <div className="grid grid-cols-7 gap-1">
                {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map(
                  (day) => (
                    <div
                      key={day}
                      className="text-center text-sm font-medium text-gray-500 py-2"
                    >
                      {day}
                    </div>
                  ),
                )}
                {calendarDays.map((day, index) => {
                  if (!day) return <div key={`empty-${index}`} />;
                  return (
                    <div
                      key={index}
                      className={`p-1 text-center rounded-lg transition-colors text-xs flex flex-col justify-center h-16 ${day.isPast || !day.isAvailable ? 'text-gray-400 bg-gray-100 cursor-not-allowed' : day.isSelected ? 'bg-blue-600 text-white' : day.isBetween ? 'bg-blue-100' : 'hover:bg-gray-100 cursor-pointer'}`}
                      onClick={() => handleDateClick(day)}
                    >
                      <div className="font-medium">{day.date.getDate()}</div>
                      {!day.isPast && day.isAvailable && (
                        <div className="text-xs">{formatPrice(day.price)}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            <div className="flex justify-end pt-4 border-t">
              <Button
                onClick={() => setShowCalendar(false)}
                disabled={!checkInDate || !checkOutDate}
              >
                Konfirmasi Tanggal
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Booking Confirmation Modal */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Konfirmasi Pemesanan</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Kamar:</span>
                <span className="font-medium">{selectedRoom?.name}</span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Check-in:</span>
                <span className="font-medium">
                  {checkInDate && formatDate(checkInDate)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Check-out:</span>
                <span className="font-medium">
                  {checkOutDate && formatDate(checkOutDate)}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-gray-600">Tamu:</span>
                <span className="font-medium">{guests} orang</span>
              </div>

              {priceBreakdown && (
                <div className="flex justify-between border-t pt-3">
                  <span className="text-gray-600">Total Pembayaran:</span>
                  <span className="font-bold text-lg">
                    IDR {formatPrice(priceBreakdown.total)}
                  </span>
                </div>
              )}
            </div>

            <div className="flex space-x-3 pt-4">
              <Button
                variant="outline"
                className="flex-1 bg-transparent"
                onClick={() => setShowConfirmation(false)}
              >
                Cek Lagi
              </Button>
              <Button
                className="flex-1 bg-blue-600 hover:bg-blue-700"
                onClick={handleFinalBooking}
              >
                Lanjutkan
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
