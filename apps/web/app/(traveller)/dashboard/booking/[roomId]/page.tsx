'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams, useSearchParams } from 'next/navigation';
import api from '@/lib/axios';
import { createBooking } from '@/api/booking.service';
import { CreateBookingInput } from '@/types/booking.types';
import { getRoomById } from '@/api/room.service';
import { RoomType } from '@/types/room.types';
import { getClientSession } from '@/lib/session-client';
import Image from 'next/image';

export default function BookingConfirmationPage() {
  const params = useParams();
  const roomId = Array.isArray(params.roomId)
    ? params.roomId[0]
    : params.roomId;
  const router = useRouter();
  const searchParams = useSearchParams();

  const [room, setRoom] = useState<RoomType | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRedirecting, setIsRedirecting] = useState(false);

  const [form, setForm] = useState<CreateBookingInput>({
    user_id: '',
    room_id: '',
    check_in: searchParams.get('check_in') || '2025-07-08',
    check_out: searchParams.get('check_out') || '2025-07-09',
    guest_adults: Number(searchParams.get('guest_adults')) || 2,
    guest_children: Number(searchParams.get('guest_children')) || 0,
    full_name: '',
    email: '',
    phone: '',
    payment_method: 'MIDTRANS',
    total_price: '',
  });

  const getTotalNights = () => {
    const checkIn = new Date(form.check_in);
    const checkOut = new Date(form.check_out);
    const diff =
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24);
    return Math.max(diff, 1);
  };

  const getTotalPrice = (basePrice: number) => {
    const nights = getTotalNights();
    return basePrice * nights;
  };

  const totalNights = getTotalNights();
  const roomPrice = room?.base_price ? room.base_price * totalNights : 0;
  const serviceFee = Math.round(roomPrice * 0.05);
  const tax = Math.round(roomPrice * 0.11);
  const total = roomPrice + serviceFee + tax;

  useEffect(() => {
    const fetchData = async () => {
      const session = getClientSession();

      if (!session || session.role !== 'TRAVELLER') {
        router.push('/login');
        return;
      }

      try {
        const roomData = await getRoomById(roomId as string);
        console.log('roomData:', roomData);

        setRoom(roomData);
        setForm((prev) => ({
          ...prev,
          user_id: session.id,
          room_id: roomData.id,
          total_price: getTotalPrice(roomData.base_price).toString(),
        }));
      } catch (error) {
        console.error('Room not found:', error);
        setRoom(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [roomId, router]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    if (!form.full_name || !form.email || !form.phone) {
      alert('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);

    try {
      const booking = await createBooking(form);
      setIsRedirecting(true);
      if (form.payment_method === 'MIDTRANS') {
        const res = await api.post('/payments/snap', {
          bookingId: booking.id,
        });
        const { redirectUrl } = res.data;
        window.location.href = redirectUrl;
      } else {
        router.push(`/dashboard/payment/${booking.id}`);
      }
    } catch (err) {
      console.error('Booking failed:', err);
      alert('Booking failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
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
  }

  if (!room) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-300">
        <div className="text-center space-y-4">
          <svg
            className="mx-auto h-20 w-20 text-blue-700"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v2m0 4h.01M4.93 19h14.14c1.24 0 2.1-1.33 1.45-2.43L13.45 4.57c-.62-1.07-2.28-1.07-2.9 0L3.48 16.57C2.82 17.67 3.68 19 4.93 19z"
            />
          </svg>
          <h2 className="text-2xl font-semibold text-blue-600">
            Room Not Found
          </h2>
          <p className="text-gray-600">
            Sorry, we couldnt find the room youre looking for.
            <br />
            Please check the link or try again later.
          </p>
          <button
            onClick={() => router.push(`/property`)}
            className="mt-4 px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow"
          >
            Back to Booking
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-7 py-17 grid grid-cols-1 md:grid-cols-2 gap-6 font-sans bg-gray-50 rounded-2xl shadow-lg">
        {/* Left: Form */}
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-900">
            Booking Confirmation
          </h1>

          <div className="bg-white rounded-xl shadow p-6 space-y-4">
            <h2 className="font-semibold text-lg text-gray-900">
              Personal Information
            </h2>
            <input
              name="full_name"
              onChange={handleChange}
              value={form.full_name}
              placeholder="Full name"
              className="w-full border p-2 rounded text-gray-700"
            />
            <input
              name="email"
              onChange={handleChange}
              value={form.email}
              placeholder="Email"
              className="w-full border p-2 rounded text-gray-700"
            />
            <input
              name="phone"
              onChange={handleChange}
              value={form.phone}
              placeholder="Phone"
              className="w-full border p-2 rounded text-gray-700"
            />
          </div>

          <div className="bg-white rounded-xl shadow p-6 space-y-4">
            <h2 className="font-semibold text-lg text-gray-900">
              Payment Options
            </h2>
            <div className="flex gap-4">
              <label
                className={`cursor-pointer border rounded-xl p-4 text-center font-medium transition-all duration-200 ${
                  form.payment_method === 'MIDTRANS'
                    ? 'border-blue-600 bg-blue-100 text-blue-700'
                    : 'border-gray-300 text-gray-600 hover:border-blue-400'
                }`}
              >
                <input
                  type="radio"
                  name="payment_method"
                  value="MIDTRANS"
                  checked={form.payment_method === 'MIDTRANS'}
                  onChange={handleChange}
                  className="hidden"
                />
                Pembayaran Otomatis
              </label>

              <label
                className={`cursor-pointer border rounded-xl p-4 text-center font-medium transition-all duration-200 ${
                  form.payment_method === 'MANUAL'
                    ? 'border-blue-600 bg-blue-100 text-blue-700'
                    : 'border-gray-300 text-gray-600 hover:border-blue-400'
                }`}
              >
                <input
                  type="radio"
                  name="payment_method"
                  value="MANUAL"
                  checked={form.payment_method === 'MANUAL'}
                  onChange={handleChange}
                  className="hidden"
                />
                Pembayaran Manual
              </label>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 text-sm text-gray-600">
            <p>Reservasi tidak dapat dibatalkan atau dikembalikan. .</p>
            <p className="mt-2">
              Dengan melanjutkan, saya menyetujui kebijakan EasyGo.
            </p>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow disabled:opacity-50"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <div className="flex justify-center items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
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
                <span>Processing ...</span>
              </div>
            ) : (
              'Booking Now'
            )}
          </button>
        </div>

        {/* Right: Summary */}
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <div className="relative w-full h-52 rounded-lg overflow-hidden">
            <Image
              src={
                room.images?.[0]?.image_url ||
                'https://i.pinimg.com/736x/2a/86/a5/2a86a560f0559704310d98fc32bd3d32.jpg'
              }
              alt={room.name || 'Room Image'}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority
            />
          </div>
          <h2 className="font-semibold text-lg text-gray-600">{room.name}</h2>
          <p className="text-sm text-gray-600">Max Guest: {room.max_guest}</p>

          <div className="text-sm mt-4">
            <p className="font-medium text-gray-600">Trip Details</p>
            <p className="text-gray-600">
              Check In: <span className="float-right">{form.check_in}</span>
            </p>
            <p className="text-gray-600">
              Check Out: <span className="float-right">{form.check_out}</span>
            </p>

            <p className="font-medium mt-4 text-gray-600">Guest</p>
            <p className="text-gray-600">
              Guest: <span className="float-right">{form.guest_adults}</span>
            </p>

            <p className="font-medium mt-4 text-gray-600">Price Breakdown</p>
            <p className="text-gray-600">
              Rooms ({totalNights} night{totalNights > 1 ? 's' : ''}):
              <span className="float-right">
                IDR {roomPrice.toLocaleString('id-ID')}
              </span>
            </p>
            <p className="text-gray-600">
              Service Fee (5%):
              <span className="float-right">
                IDR {serviceFee.toLocaleString('id-ID')}
              </span>
            </p>
            <p className="text-gray-600">
              Tax (11%):
              <span className="float-right">
                IDR {tax.toLocaleString('id-ID')}
              </span>
            </p>
            <p className="font-bold mt-2 text-gray-600">
              Total:
              <span className="float-right">
                IDR {total.toLocaleString('id-ID')}
              </span>
            </p>
          </div>
        </div>
      </div>
      {isRedirecting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 shadow-lg flex items-center gap-3">
            <svg
              className="animate-spin h-6 w-6 text-blue-600"
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
            <p className="text-blue-700 font-medium">
              Redirecting to payment...
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
