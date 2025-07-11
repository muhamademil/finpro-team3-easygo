'use client';

import { useState } from 'react';
import Breadcrumb from '@/components/Features/Shared/Detail-Property/Breadcumb';
import ImageGallery from '@/components/Features/Shared/Detail-Property/ImageGallery';
import PropertyInfo from '@/components/Features/Shared/Detail-Property/PropertyInfo';
import Description from '@/components/Features/Shared/Detail-Property/Description';
import Facilities from '@/components/Features/Shared/Detail-Property/Facilities';
import RoomSelection from '@/components/Features/Shared/Detail-Property/RoomSelection';
import LocationMap from '@/components/Features/Shared/Detail-Property/LocationMap';
import BookingCard from '@/components/Features/Shared/Detail-Property/BookingCard';
import type {
  Property,
  Room,
  BookingDetails,
} from '@/types/detailProperty.types';

type PropertyDetailClientProps = {
  property: Property;
};

export function PropertyDetailClient({ property }: PropertyDetailClientProps) {
  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null);
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    checkIn: null,
    checkOut: null,
    guests: 2,
    selectedRoom: null,
  });

  const handleRoomSelect = (room: Room) => {
    setSelectedRoom(room);
    setBookingDetails((prev) => ({ ...prev, selectedRoom: room }));
  };

  const handleBookingChange = (details: Partial<BookingDetails>) => {
    setBookingDetails((prev) => ({ ...prev, ...details }));
  };

  const imageUrls = property.images.map((img) => img.image_url);

  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Breadcrumb
          items={[
            { label: 'Properti', href: '/explore' },
            { label: property.city, href: `/explore?city=${property.city}` },
            { label: property.name, href: '#' },
          ]}
        />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-6">
          <div className="lg:col-span-2 space-y-8">
            <ImageGallery images={imageUrls} />
            <PropertyInfo
              name={property.name}
              location={property.location}
              rating={property.rating}
              reviewCount={property.reviews}
              host={property.tenant!.user}
            />
            <Description description={property.description} />
            <Facilities
              facilities={property.facilities.map((f) => f.facility)}
            />
            <RoomSelection
              rooms={property.rooms}
              selectedRoom={selectedRoom}
              onRoomSelect={handleRoomSelect}
              propertyImage={property.images[0].image_url}
            />
            <LocationMap
              coordinates={{
                lat: property.latitude,
                lng: property.longitude,
              }}
            />
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 z-40">
              <BookingCard
                basePrice={property.lowest_price}
                selectedRoom={selectedRoom}
                bookingDetails={bookingDetails}
                onBookingChange={handleBookingChange}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
