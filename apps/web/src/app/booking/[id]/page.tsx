'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { api } from '@/app/lib/axios';
import Image from 'next/image';

export default function BookingPage() {
  const { id } = useParams();
  const router = useRouter();

  const [room, setRoom] = useState<any>(null);
  const [availability, setAvailability] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    userId: 1,
    roomId: Number(id),
    startDate: '2025-06-05',
    endDate: '2025-06-06',
    totalPrice: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roomRes = await api.get(`/room/${id}`);
        const roomData = roomRes.data;
        setRoom(roomData);
        setForm((prev) => ({
          ...prev,
          roomId: roomData.id,
          totalPrice: roomData.basePrice,
        }));

        const availRes = await api.get(`/room/${id}/availability`, {
          params: {
            startDate: '2025-06-05',
            endDate: '2025-06-06',
          },
        });
        setAvailability(availRes.data);
      } catch (err) {
        console.error('Gagal fetch data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchData();
  }, [id]);

  const handleSubmit = async () => {
    try {
      await api.post('/bookings', form);
      router.push('/payment/success');
    } catch (error) {
      console.error('Gagal booking:', error);
      alert('Gagal melakukan booking.');
    }
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  if (!room)
    return (
      <div className="text-center py-20 text-red-500">
        Room tidak ditemukan.
      </div>
    );

  return (
    <div className="w-screen mx-auto px-4 py-10 bg-white text-black">
      <h1 className="text-3xl font-bold mb-8">Konfirmasi Pemesanan</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Left Form */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <input
              type="text"
              className="w-full border px-4 py-2 rounded-md"
              placeholder="Nama lengkap kamu"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full border px-4 py-2 rounded-md"
              placeholder="example@mail.com"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Phone</label>
            <input
              type="text"
              className="w-full border px-4 py-2 rounded-md"
              placeholder="08123456789"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Opsi Pembayaran
            </label>
            <div className="flex space-x-3">
              <button className="px-4 py-2 rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200">
                Pembayaran Otomatis
              </button>
              <button className="px-4 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-100">
                Manual
              </button>
            </div>
          </div>

          <p className="text-xs text-gray-500">
            Dengan melanjutkan, kamu menyetujui syarat dan ketentuan pemesanan
            EasyGo.
          </p>

          <button
            onClick={handleSubmit}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold"
          >
            Lanjut ke Pembayaran
          </button>
        </div>

        {/* Right Summary */}
        <div className="border p-6 rounded-xl shadow-md bg-gray-50">
          {room.picture ? (
            <Image
              src={room.picture}
              alt={room.name}
              width={500}
              height={300}
              className="rounded-md w-full object-cover h-60 mb-4"
            />
          ) : (
            <div className="bg-gray-200 rounded-md w-full h-60 flex items-center justify-center text-gray-500 mb-4">
              No Image Available
            </div>
          )}

          <h2 className="text-xl font-semibold">{room.name}</h2>
          <p className="text-yellow-500 text-sm mb-2">⭐ 4.99 (802 reviews)</p>

          <div className="text-sm space-y-1 mb-4">
            <p>
              Check In: <strong>{form.startDate}</strong>
            </p>
            <p>
              Check Out: <strong>{form.endDate}</strong>
            </p>
            <p>
              Guests: <strong>2 Adults</strong>
            </p>
          </div>

          <div className="border-t pt-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span>Rooms</span>
              <span>IDR {room.basePrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Taxes & Fees</span>
              <span>IDR 80.000</span>
            </div>
            <div className="flex justify-between font-bold text-base">
              <span>Total</span>
              <span>IDR 1.620.000</span>
            </div>
          </div>

          <div className="mt-6">
            <h3 className="font-semibold mb-1">Ketersediaan</h3>
            <ul className="text-sm space-y-1">
              {availability.map((a) => (
                <li key={a.id}>
                  {a.date.slice(0, 10)} —{' '}
                  {a.isAvailable ? '✅ Tersedia' : '❌ Tidak tersedia'}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
