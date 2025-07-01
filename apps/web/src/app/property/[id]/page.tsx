'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { getPropertyById } from '@/app/lib/property';
import { Property } from '@/app/types/property';
import Image from 'next/image';

export default function PropertyDetailPage() {
  const { id } = useParams();
  const [property, setProperty] = useState<Property | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const validId = Array.isArray(id) ? id[0] : id;
          const data = await getPropertyById(validId);
          setProperty(data);
        } catch (error) {
          console.error('Failed to fetch property:', error);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [id]);

  if (loading) return <div className="p-8">Loading...</div>;
  if (!property) return <div className="p-8">Property not found</div>;

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{property.name}</h1>
      <p className="text-gray-500">{property.location} - {property.category}</p>

      {/* Main Image */}
      {property.mainImage && (
        <div className="w-full h-[400px] my-6 relative">
          <Image
            src={property.mainImage}
            alt={property.name}
            fill
            className="object-cover rounded-xl"
          />
        </div>
      )}

      {/* Description */}
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Description</h2>
        <p className="text-gray-700">{property.description}</p>
      </div>

      {/* Rooms */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-2">Rooms</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {property.rooms.map((room) => (
            <div key={room.id} className="border rounded-lg p-4 shadow-md">
              <h3 className="text-lg font-bold">{room.name}</h3>
              <p className="text-sm text-gray-600">{room.description}</p>
              <p className="text-sm mt-2">💰 {room.basePrice} / night</p>
              <p className="text-sm">👥 Capacity: {room.capacity}</p>
              {room.picture && (
                <Image
                  src={room.picture}
                  alt={room.name}
                  width={300}
                  height={200}
                  className="mt-2 rounded"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
