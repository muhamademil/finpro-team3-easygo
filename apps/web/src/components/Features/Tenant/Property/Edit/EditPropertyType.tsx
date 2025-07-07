// components/features/listing/edit/EditPropertyType.tsx
'use client';

import { useListingStore } from '@/stores/useListing.store';

const propertyTypes = ['VILLA', 'APARTMENT', 'GUEST_HOUSE'] as const;

export const EditPropertyType = () => {
  const { listingData, setPropertyType } = useListingStore();

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Tipe Properti</h2>
      <div className="flex flex-col sm:flex-row gap-4">
        {propertyTypes.map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => setPropertyType(type)}
            className={`w-full border-2 rounded-xl p-4 text-left transition-all ${
              listingData.propertyType === type
                ? 'border-blue-600 bg-blue-50'
                : 'border-gray-300'
            }`}
          >
            <span className="text-xl font-medium text-gray-800">{type}</span>
          </button>
        ))}
      </div>
    </section>
  );
};
