'use client';

import { useState, useEffect } from 'react';
import PropertySelector from '@/components/Features/Tenant/Season/PropertySelector';
import Calendar from '@/components/Features/Tenant/Season/Calendar';
import PriceControlPanel from '@/components/Features/Tenant/Season/PriceControlPanel';
import type { Propertyadd, PricingData } from '@/types/type';

// Sample data with different base prices per property
const properties: Propertyadd[] = [
  { id: '1', name: 'Villa Nuansa Bali', basePrice: 900000 },
  { id: '2', name: 'Villa Sunset Beach', basePrice: 600000 },
  { id: '3', name: 'Villa Mountain View', basePrice: 750000 },
];

export default function SeasonPage() {
  const [selectedProperty, setSelectedProperty] = useState<string>('1');
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isRentalActive, setIsRentalActive] = useState<boolean>(true);
  const [priceAdjustmentType, setPriceAdjustmentType] =
    useState<string>('nominal');
  const [nominalAmount, setNominalAmount] = useState<string>('');
  const [percentageAmount, setPercentageAmount] = useState<string>('10');

  // Store saved pricing data
  const [savedPricing, setSavedPricing] = useState<Record<string, PricingData>>(
    {},
  );

  const currentProperty = properties.find((p) => p.id === selectedProperty);
  const basePrice = currentProperty?.basePrice || 720000;

  const handleDateSelect = (dateString: string, savedData?: PricingData) => {
    setSelectedDate(dateString);

    if (savedData) {
      setIsRentalActive(savedData.isActive);
      setPriceAdjustmentType(savedData.adjustmentType);
      setNominalAmount(savedData.nominalAmount);
      setPercentageAmount(savedData.percentageAmount);
    } else {
      // Reset to defaults
      setIsRentalActive(true);
      setPriceAdjustmentType('nominal');
      setNominalAmount('');
      setPercentageAmount('10');
    }
  };

  const handleSave = () => {
    if (selectedDate === null) return;

    const dateKey = `${selectedProperty}-${selectedDate}`;
    setSavedPricing((prev) => ({
      ...prev,
      [dateKey]: {
        isActive: isRentalActive,
        adjustmentType: priceAdjustmentType,
        nominalAmount,
        percentageAmount,
      },
    }));

    // Reset selection
    setSelectedDate(null);
  };

  // Reset selected date when property changes
  useEffect(() => {
    setSelectedDate(null);
    setIsRentalActive(true);
    setNominalAmount('');
    setPercentageAmount('10');
  }, [selectedProperty]);

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar Section */}
          <div className="lg:col-span-2">
            <PropertySelector
              properties={properties}
              selectedProperty={selectedProperty}
              onPropertyChange={setSelectedProperty}
            />

            <Calendar
              currentDate={currentDate}
              onDateChange={setCurrentDate}
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
              selectedProperty={selectedProperty}
              basePrice={basePrice}
              savedPricing={savedPricing}
            />
          </div>

          {/* Price Control Panel */}
          <div className="lg:col-span-1">
            <PriceControlPanel
              selectedDate={selectedDate}
              basePrice={basePrice}
              isRentalActive={isRentalActive}
              onRentalActiveChange={setIsRentalActive}
              priceAdjustmentType={priceAdjustmentType}
              onPriceAdjustmentTypeChange={setPriceAdjustmentType}
              nominalAmount={nominalAmount}
              onNominalAmountChange={setNominalAmount}
              percentageAmount={percentageAmount}
              onPercentageAmountChange={setPercentageAmount}
              onSave={handleSave}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
