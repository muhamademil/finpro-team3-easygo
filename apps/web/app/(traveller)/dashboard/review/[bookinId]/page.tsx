'use client';

import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import axios from '@/lib/axios';
import { BookingDetailPayload } from '@/types/booking.types';

export default function ReviewFormPage() {
  const { bookingId } = useParams();
  const router = useRouter();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [booking, setBooking] = useState<BookingDetailPayload | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!bookingId) return;

    axios
      .get(`/bookings/${bookingId}`)
      .then((res) => {
        setBooking(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to fetch booking', err);
        setLoading(false);
      });
  }, [bookingId]);

  const handleSubmit = async () => {
    if (
      !booking?.id ||
      !booking?.room?.property?.id ||
      !rating ||
      !comment.trim()
    ) {
      alert('Pastikan semua field terisi');
      return;
    }

    if (!rating || !comment.trim()) {
      alert('Mohon isi semua field');
      return;
    }

    try {
      await axios.post('/reviews', {
        bookingId: booking.id,
        propertyId: booking.room.property.id,
        rating,
        comment,
      });

      console.log('submit review payload', {
        bookingId: booking?.id,
        rating,
        comment,
        propertyId: booking?.room?.property?.id,
      });

      alert('Review berhasil dikirim');
      router.push('/dashboard/booking/my-booking');
    } catch (err) {
      console.error(err);
      alert('Gagal mengirim review');
    }
  };

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

  if (!booking)
    return (
      <div className="text-center py-10 text-red-500">
        Booking tidak ditemukan
      </div>
    );

  if (booking.status !== 'COMPLETED') {
    return (
      <div className="text-center py-10 text-yellow-600">
        Booking belum selesai, belum bisa memberi ulasan.
      </div>
    );
  }

  if (booking.review) {
    return (
      <div className="text-center py-10 text-green-600">
        Review sudah dikirim untuk booking ini.
      </div>
    );
  }

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">Tulis Ulasan</h1>
      <p className="mb-2 font-medium">{booking.room.property.name}</p>

      <label className="block mb-1 font-medium">Rating:</label>
      <select
        value={rating}
        onChange={(e) => setRating(parseInt(e.target.value))}
        className="w-full mb-4 border rounded px-2 py-2"
      >
        <option value={0}>Pilih rating</option>
        {[1, 2, 3, 4, 5].map((r) => (
          <option key={r} value={r}>
            {r} - {['Buruk', 'Kurang', 'Cukup', 'Bagus', 'Luar Biasa'][r - 1]}
          </option>
        ))}
      </select>

      <label className="block mb-1 font-medium">Komentar:</label>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
        className="w-full border rounded px-2 py-2 mb-4"
      ></textarea>

      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
      >
        Kirim Ulasan
      </button>
    </div>
  );
}
