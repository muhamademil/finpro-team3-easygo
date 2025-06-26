'use client';

import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { useState } from 'react';

export const GuestPicker = () => {
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);

  return (
    <Popover className="relative w-full">
      <PopoverButton className="bg-gray-100 px-4 py-2 rounded-lg text-sm text-gray-700 w-full text-left flex items-center justify-between">
        {adults} Adults, {children} Child
      </PopoverButton>

      <PopoverPanel className="absolute z-10 mt-2 bg-white border shadow-lg rounded-lg p-4 w-64">
        <div className="space-y-4">
          {/* Adults */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700">Adults</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setAdults(Math.max(1, adults - 1))}
                className="w-6 h-6 flex items-center justify-center border text-gray-700 rounded hover:bg-gray-200"
              >
                −
              </button>
              <span className="text-slate-700 text-sm px-1">{adults}</span>
              <button
                onClick={() => setAdults(adults + 1)}
                className="w-6 h-6 flex items-center justify-center border text-gray-700 rounded hover:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>

          {/* Children */}
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-700">Children</span>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setChildren(Math.max(0, children - 1))}
                className="w-6 h-6 flex items-center justify-center border text-gray-700 rounded hover:bg-gray-200"
              >
                −
              </button>
              <span className="text-slate-700 text-sm px-1">{children}</span>
              <button
                onClick={() => setChildren(children + 1)}
                className="w-6 h-6 flex items-center justify-center border text-gray-700 rounded hover:bg-gray-200"
              >
                +
              </button>
            </div>
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  );
};
