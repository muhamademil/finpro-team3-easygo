'use client';

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { format } from 'date-fns';
import { DateRange as ReactDateRange } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

// Definisikan tipe untuk props yang diterima
export type DateRange = {
  startDate: Date;
  endDate: Date;
  key: string;
};

interface DateRangePickerProps {
  value: DateRange;
  onChange: (value: DateRange) => void;
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  onChange,
}) => {
  return (
    <Popover className="relative w-full">
      {/* Tombol sekarang menampilkan nilai dari props */}
      <PopoverButton className="bg-gray-100 px-4 py-2 rounded-lg text-sm text-gray-700 w-full text-left flex items-center justify-between">
        {format(value.startDate, 'dd MMM')} - {format(value.endDate, 'dd MMM')}
      </PopoverButton>

      {/* Popover Panel tidak perlu state show/hide sendiri, Headless UI menanganinya */}
      <PopoverPanel className="absolute z-20 mt-2">
        <ReactDateRange
          editableDateInputs={true}
          // Panggil prop onChange saat ada perubahan
          onChange={(item) => onChange(item.selection as DateRange)}
          moveRangeOnFirstSelection={false}
          // 'ranges' sekarang menggunakan nilai dari props
          ranges={[value]}
          className="shadow-lg"
        />
      </PopoverPanel>
    </Popover>
  );
};
