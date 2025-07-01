'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { api } from '@/app/lib/axios';
import Image from 'next/image';

export default function BookingPage() {
  const { id } = useParams(); // pastikan route adalah /booking/[id]
  const [room, setRoom] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await api.get(`/rooms/${id}`);
        setRoom(res.data);
      } catch (error) {
        console.error('Error fetching room:', error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchRoom();
  }, [id]);

  if (loading) return <div className="p-10">Loading...</div>;
  if (!room) return <div className="p-10">Room not found</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-2">Villas &gt; Bali &gt; {room.name}</div>

      {/* Title & Images */}
      <h1 className="text-3xl font-bold mb-2">{room.name}</h1>
      <p className="text-gray-500 mb-4">{room.location}</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mb-8">
        <div className="md:col-span-2">
          <Image src={room.mainImage} alt="Main Image" width={800} height={500} className="rounded-lg w-full h-[400px] object-cover" />
        </div>
        <div className="grid grid-cols-2 gap-2">
          {room.images?.slice(0, 4).map((img: string, i: number) => (
            <Image key={i} src={img} alt={`Room image ${i}`} width={300} height={200} className="rounded-lg object-cover h-[120px] w-full" />
          ))}
        </div>
      </div>

      {/* Description & Sidebar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-700 mb-6">{room.description}</p>

          <h2 className="text-xl font-semibold mb-2">Fasilitas Tersedia</h2>
          <div className="grid grid-cols-2 gap-2 text-gray-700">
            {room.facilities?.map((fac: string, i: number) => (
              <div key={i} className="flex items-center space-x-2">
                <span>•</span>
                <span>{fac}</span>
              </div>
            ))}
          </div>

          <h2 className="text-xl font-semibold mt-6 mb-2">Lokasi Kami</h2>
          <div className="rounded-lg overflow-hidden h-[300px]">
            <iframe
              src={`https://www.google.com/maps?q=${room.latitude},${room.longitude}&z=15&output=embed`}
              width="100%"
              height="100%"
              allowFullScreen
              loading="lazy"
              className="w-full h-full"
            ></iframe>
          </div>
        </div>

        {/* Booking Box */}
        <div className="border rounded-xl p-6 shadow-lg">
          <div className="text-xl font-semibold mb-2 text-gray-900">IDR {Number(room.basePrice).toLocaleString('id-ID')} / night</div>
          <div className="text-sm text-gray-400 mb-4">Harga belum termasuk pajak</div>

          <div className="mb-4">
            <label className="block text-sm font-medium">Check-in</label>
            <input type="date" className="border px-3 py-2 rounded w-full" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Check-out</label>
            <input type="date" className="border px-3 py-2 rounded w-full" />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium">Guests</label>
            <select className="border px-3 py-2 rounded w-full">
              <option>1 Guest</option>
              <option>2 Guests</option>
              <option>3 Guests</option>
              <option>4 Guests</option>
            </select>
          </div>

          <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 w-full rounded-lg mt-2">
            Lanjut Pembayaran
          </button>

          <div className="text-xs text-gray-400 mt-2">* Anda akan diarahkan ke halaman pembayaran setelah check-in dan check-out diisi</div>
        </div>
      </div>
    </div>
  );
}
