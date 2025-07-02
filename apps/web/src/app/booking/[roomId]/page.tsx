'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import axios from 'axios';
import api from '@/lib/axios';
import { createBooking } from '@/api/booking.service';
import { CreateBookingInput } from '@/types/booking.types';
import { Room } from '@/types/room';
import { getRoomById } from '@/api/room.service';

export default function BookingConfirmationPage() {
  const { roomId } = useParams();
  const router = useRouter();

  console.log('roomId:', roomId);

  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState<CreateBookingInput>({
    user_id: 'user-6-uuid', // dari context auth / sementara hardcode
    room_id: roomId as string,
    check_in: '2025-08-08',
    check_out: '2025-08-09',
    guest_adults: 2,
    guest_children: 1,
    full_name: '',
    email: '',
    phone: '',
    payment_method: 'MIDTRANS',
  });

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        if (!roomId) {
          console.warn('Room ID not found in params');
          return;
        }
        const res = await getRoomById(roomId as string);
        setRoom(res);
      } catch (error) {
        console.error('Failed to fetch room:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [roomId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async () => {
    try {
      const booking = await createBooking(form);
      // console.log('✅ Booking result:', booking);

      if (!form.full_name || !form.email || !form.phone) {
        alert('Please complete all personal information');
        return;
      }

      if (form.payment_method === 'MIDTRANS') {
        const res = await api.post('/payments/snap', {
          bookingId: booking.id,
        });
        // console.log('🧾 bookingId sent:', booking.id);

        const { redirectUrl } = res.data;
        window.location.href = redirectUrl;
      } else {
        router.push(`/payment/${booking.id}`);
      }
    } catch (error) {
      alert('Booking failed. Please try again.');
      console.error(error);
    }
  };

  if (loading) {
    return <div className="p-6 text-center">Loading room info...</div>;
  }

  if (!room) {
    return <div className="p-6 text-center text-red-500">Room not found.</div>;
  }

  const totalPrice = room.base_price + 789;

  return (
    <div className="bg-blue-100 min-h-screen">
      <div className="max-w-7xl mx-auto px-7 py-17 grid grid-cols-1 md:grid-cols-2 gap-6 font-sans bg-gray-50 rounded-2xl shadow-lg">
        {/* Left: Form */}
        <div className="space-y-6">
          <h1 className="text-2xl font-bold text-gray-600">
            Booking Confirmation
          </h1>

          <div className="bg-white rounded-xl shadow p-6 space-y-4">
            <h2 className="font-semibold text-lg text-gray-600">
              Personal Information
            </h2>
            <input
              name="full_name"
              onChange={handleChange}
              value={form.full_name}
              placeholder="Full name"
              className="w-full border p-2 rounded text-gray-400"
            />
            <input
              name="email"
              onChange={handleChange}
              value={form.email}
              placeholder="Email"
              className="w-full border p-2 rounded text-gray-400"
            />
            <input
              name="phone"
              onChange={handleChange}
              value={form.phone}
              placeholder="Phone"
              className="w-full border p-2 rounded text-gray-400"
            />
          </div>

          <div className="bg-white rounded-xl shadow p-6 space-y-4">
            <h2 className="font-semibold text-lg text-gray-600">
              Payment Options
            </h2>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="radio"
                  name="payment_method"
                  value="MIDTRANS"
                  checked={form.payment_method === 'MIDTRANS'}
                  onChange={handleChange}
                />
                Pembayaran Otomatis
              </label>
              <label className="flex items-center gap-2 text-gray-600">
                <input
                  type="radio"
                  name="payment_method"
                  value="MANUAL"
                  checked={form.payment_method === 'MANUAL'}
                  onChange={handleChange}
                />
                Pembayaran Manual
              </label>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6 text-sm text-gray-600">
            <p>
              Reservasi tidak dapat dibatalkan atau dikembalikan.{' '}
              <a href="#" className="text-blue-600 underline">
                Pelajari selengkapnya
              </a>
              .
            </p>
            <p className="mt-2">
              Dengan melanjutkan, saya menyetujui kebijakan EasyGo.
            </p>
          </div>

          <button
            onClick={handleSubmit}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl shadow"
          >
            Lanjut Pembayaran
          </button>
        </div>

        {/* Right: Summary */}
        <div className="bg-white rounded-xl shadow p-6 space-y-4">
          <img
            src={
              room.images?.[0]?.image_url ||
              'https://via.placeholder.com/400x200'
            }
            alt="room"
            className="rounded-lg w-full h-52 object-cover"
          />
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
              Adults: <span className="float-right">{form.guest_adults}</span>
            </p>
            <p className="text-gray-600">
              Children:{' '}
              <span className="float-right">{form.guest_children}</span>
            </p>

            <p className="font-medium mt-4 text-gray-600">Price Breakdown</p>
            <p className="text-gray-600">
              Rooms:{' '}
              <span className="float-right">
                IDR {room.base_price.toLocaleString()}
              </span>
            </p>
            <p className="text-gray-600">
              Taxes & Fees: <span className="float-right">IDR 80,000</span>
            </p>
            <p className="font-bold mt-2 text-gray-600">
              Total:{' '}
              <span className="float-right">
                IDR {totalPrice.toLocaleString()}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
