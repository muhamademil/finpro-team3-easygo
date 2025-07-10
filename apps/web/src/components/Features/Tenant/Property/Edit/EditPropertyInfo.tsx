// components/features/listing/edit/EditPropertyInfo.tsx
'use client';

import { useListingStore } from '@/src/stores/useListing.store';
import { Input } from '@/src/components/ui/input';
import { Textarea } from '@/src/components/ui/textarea';
import dynamic from 'next/dynamic';
import { useMemo } from 'react';

export const EditPropertyInfo = () => {
  const { listingData, setField } = useListingStore();

  const MapPicker = useMemo(
    () =>
      dynamic(
        () =>
          import(
            '@/src/components/Features/Tenant/Property/Listing/MapPicker'
          ).then((mod) => mod.MapPicker),
        { ssr: false, loading: () => <p>Loading map...</p> },
      ),
    [],
  );

  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Info Properti</h2>
      <div className="space-y-6">
        <div>
          <label className="text-sm font-medium">Place Title</label>
          <Input
            name="title"
            value={listingData.title}
            onChange={(e) => setField('title', e.target.value)}
          />
        </div>
        <div>
          <label className="text-sm font-medium">Description</label>
          <Textarea
            name="description"
            value={listingData.description}
            onChange={(e) => setField('description', e.target.value)}
          />
        </div>
        {/* ... Input untuk Address dan City ... */}
        <div>
          <label className="text-sm font-medium">Lokasi Spesifik</label>
          <div className="mt-2 rounded-lg overflow-hidden">
            <MapPicker />
          </div>
        </div>
      </div>
    </section>
  );
};
