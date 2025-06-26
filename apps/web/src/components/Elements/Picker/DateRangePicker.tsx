'use client';

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { format } from 'date-fns';
import { DateRange } from 'react-date-range';
import { useState } from 'react';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

export const DateRangePicker = () => {
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);

  return (
    <Popover className="relative w-full">
      <PopoverButton
        onClick={() => setShowDatePicker(!showDatePicker)}
        className="bg-gray-100 px-4 py-2 rounded-lg text-sm text-gray-700 w-full text-left flex items-center justify-between"
      >
        {format(dateRange[0].startDate, 'dd MMM')} -{' '}
        {format(dateRange[0].endDate, 'dd MMM')}
      </PopoverButton>

      <PopoverPanel className="absolute z-10 mt-2">
        {showDatePicker && (
          <div className="absolute z-20 mt-2">
            <DateRange
              editableDateInputs={true}
              onChange={(item) => {
                const { startDate, endDate } = item.selection;
                if (startDate && endDate) {
                  setDateRange([
                    {
                      startDate,
                      endDate,
                      key: 'selection',
                    },
                  ]);
                }
              }}
              moveRangeOnFirstSelection={false}
              ranges={dateRange}
              className="shadow-lg"
            />
          </div>
        )}
      </PopoverPanel>
    </Popover>
  );
};
