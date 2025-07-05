'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookingPayload } from '@/types/booking.types';
import { getMyBookings } from '@/api/booking.service';

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<BookingPayload[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const res = await getMyBookings();
        setBookings(res);
      } catch (err) {
        console.error('Failed to fetch bookings', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBookings();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Daftar Booking Saya</h1>
      {bookings.length === 0 && (
        <p className="text-gray-600">Belum ada booking.</p>
      )}

      <div className="space-y-6">
        {bookings.map((booking) => {
          const { room, check_in, check_out, status, review, id } = booking;
          const property = room.property;
          const image = room.images[0]?.image_url;

          return (
            <div
              key={id}
              className="border rounded-xl p-4 flex items-start gap-4 shadow-sm hover:shadow-md transition"
            >
              {image && (
                <img
                  src={image}
                  alt={property.name}
                  className="w-32 h-24 rounded object-cover"
                />
              )}
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{room.name}</h2>
                <p className="text-gray-600">
                  {property.name} - {property.city}
                </p>
                <p className="text-sm mt-1 text-gray-500">
                  {new Date(check_in).toLocaleDateString()} →{' '}
                  {new Date(check_out).toLocaleDateString()}
                </p>
                <p className="text-sm mt-1 font-medium text-blue-600">
                  Status: {status.replace('_', ' ')}
                </p>

                {status === 'COMPLETED' && !review && (
                  <button
                    onClick={() => router.push(`/review/${id}`)}
                    className="mt-3 px-4 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                  >
                    Tulis Review
                  </button>
                )}
                {review && (
                  <p className="mt-3 text-sm text-green-700">
                    ✅ Sudah memberikan review
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
