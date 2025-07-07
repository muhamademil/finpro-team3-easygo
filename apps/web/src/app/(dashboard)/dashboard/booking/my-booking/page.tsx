'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { BookingDetailPayload } from '@/types/booking.types';
import { getMyBookings } from '@/api/booking.service';
import Image from 'next/image';

export default function MyBookingsPage() {
  const [bookings, setBookings] = useState<BookingDetailPayload[]>([]);
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

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-blue-50">
        <div className="flex flex-col items-center space-y-4">
          <svg
            className="animate-spin h-10 w-10 text-blue-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          <p className="text-blue-600 font-semibold text-lg animate-pulse">
            Loading ...
          </p>
        </div>
      </div>
    );

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
                <Image
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
