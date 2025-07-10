'use client';

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { Card } from '@/src/components/ui/card';
import type { CalendarDayData } from '@/src/types/season.type';

interface CalendarDay {
  date: number;
  fullDate: Date;
  dateString: string;
  price: number;
  isSelected: boolean;
  isPast: boolean;
  isToday: boolean;
  isUnavailable: boolean;
  isDisabled: boolean;
  hasModification: boolean;
  dayData?: CalendarDayData;
}

interface CalendarProps {
  currentDate: Date;
  onDateChange: (date: Date) => void;
  selectedDate: string | null;
  onDateSelect: (dateString: string, dayData?: CalendarDayData) => void;
  calendarData: CalendarDayData[];
  basePrice: number;
  loading: boolean;
}

export default function Calendar({
  currentDate,
  onDateChange,
  selectedDate,
  onDateSelect,
  calendarData,
  basePrice,
  loading,
}: CalendarProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const handleMonthChange = (direction: 'prev' | 'next'): void => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(currentDate.getMonth() - 1);
    } else {
      newDate.setMonth(currentDate.getMonth() + 1);
    }
    onDateChange(newDate);
  };

  const generateCalendarDays = (): (CalendarDay | null)[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: (CalendarDay | null)[] = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Create a map for quick lookup of calendar data
    const dataMap = new Map(calendarData.map((d) => [d.date, d]));

    // Add actual days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = date.toISOString().split('T')[0];
      const dayData = dataMap.get(dateString);

      const isPast = date < today;
      const isSelected = selectedDate === dateString;
      const isToday = date.getTime() === today.getTime();

      let displayPrice = basePrice;
      let isUnavailable = false;
      let hasModification = false;

      // Apply data from API if exists
      if (dayData) {
        displayPrice = dayData.price;
        isUnavailable = !dayData.is_available;
        hasModification = dayData.price !== basePrice || !dayData.is_available;
      }

      days.push({
        date: day,
        fullDate: date,
        dateString,
        price: displayPrice,
        isSelected,
        isPast,
        isToday,
        isUnavailable,
        isDisabled: isPast,
        hasModification,
        dayData,
      });
    }

    return days;
  };

  const handleDateClick = (dateString: string, day: CalendarDay): void => {
    if (day.isDisabled) return;
    onDateSelect(dateString, day.dayData);
  };

  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('id-ID').format(price);
  };

  const calendarDays = generateCalendarDays();
  const currentMonthYear = currentDate.toLocaleDateString('id-ID', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <>
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleMonthChange('prev')}
          className="flex items-center space-x-2"
          disabled={loading}
        >
          <ChevronLeft className="w-4 h-4" />
          <span>Prev</span>
        </Button>

        <h2 className="text-2xl font-bold text-gray-900">{currentMonthYear}</h2>

        <Button
          variant="outline"
          size="sm"
          onClick={() => handleMonthChange('next')}
          className="flex items-center space-x-2"
          disabled={loading}
        >
          <span>Next</span>
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

      {/* Calendar */}
      <div className="bg-white rounded-lg p-6 relative">
        {loading && (
          <div className="absolute inset-0 bg-white bg-opacity-75 flex items-center justify-center z-10 rounded-lg">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          </div>
        )}

        {/* Day Headers */}
        <div className="grid grid-cols-7 gap-2 mb-4">
          {['Min', 'Sen', 'Sel', 'Rab', 'Kam', 'Jum', 'Sab'].map((day) => (
            <div
              key={day}
              className="text-center text-sm font-medium text-gray-500 py-2"
            >
              {day}
            </div>
          ))}
        </div>

        {/* Calendar Grid */}
        <div className="grid grid-cols-7 gap-2">
          {calendarDays.map((day, index) => {
            if (!day) {
              return <div key={index} className="p-3" />;
            }

            return (
              <Card
                key={day.dateString}
                className={`p-3 transition-all ${
                  day.isDisabled
                    ? 'opacity-50 cursor-not-allowed bg-gray-100'
                    : day.isUnavailable
                      ? 'bg-red-100 border-red-300 cursor-pointer'
                      : day.hasModification && !day.isSelected
                        ? 'bg-blue-100 border-blue-300 cursor-pointer hover:shadow-md'
                        : day.isSelected
                          ? 'bg-green-100 border-green-300 cursor-pointer hover:shadow-md'
                          : day.isToday
                            ? 'bg-yellow-100 border-yellow-300 cursor-pointer hover:bg-yellow-50 hover:shadow-md'
                            : 'bg-gray-100 border-gray-200 cursor-pointer hover:bg-gray-50 hover:shadow-md'
                }`}
                onClick={() =>
                  !day.isDisabled && handleDateClick(day.dateString, day)
                }
              >
                <div className="text-center">
                  <div
                    className={`text-lg font-semibold mb-1 ${
                      day.isToday
                        ? 'text-yellow-800'
                        : day.hasModification
                          ? 'text-blue-800'
                          : 'text-gray-900'
                    }`}
                  >
                    {day.date}
                  </div>
                  {day.isUnavailable ? (
                    <div className="text-xs text-red-600 font-medium">
                      Tidak Tersedia
                    </div>
                  ) : (
                    <div className="text-xs text-gray-600">
                      IDR {formatPrice(day.price)}
                    </div>
                  )}
                  {day.isToday && (
                    <div className="text-xs text-yellow-600 font-medium mt-1">
                      Hari Ini
                    </div>
                  )}
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </>
  );
}
