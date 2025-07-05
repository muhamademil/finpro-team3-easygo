'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createManualPayment } from '@/api/payment.service';
import { getBookingDetail } from '@/api/booking.service';
import Image from 'next/image';

export default function ManualPaymentPage() {
  const { bookingId } = useParams();
  const router = useRouter();

  const [booking, setBooking] = useState<any>(null);
  const [timeLeft, setTimeLeft] = useState('');
  const [proofFile, setProofFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  // Get booking detail
  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const data = await getBookingDetail(bookingId as string);
        setBooking(data);
        if (!data || !data.expires_at) {
          console.warn('expires_at not found in booking detail');
          return;
        }
        startCountdown(data.expires_at);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBooking();
  }, [bookingId]);

  // Countdown timer
  const startCountdown = (expiresAt: string) => {
    const countdown = setInterval(() => {
      const now = new Date().getTime();
      const distance = new Date(expiresAt).getTime() - now;

      if (distance < 0) {
        clearInterval(countdown);
        setTimeLeft('00:00:00');
        return;
      }

      const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((distance / (1000 * 60)) % 60);
      const seconds = Math.floor((distance / 1000) % 60);

      setTimeLeft(
        `${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
      );
    }, 1000);
  };

  const getTotalPrice = () => {
    if (!booking?.room || !booking?.check_in || !booking?.check_out) return 0;

    const checkIn = new Date(booking.check_in);
    const checkOut = new Date(booking.check_out);
    const nights = Math.ceil(
      (checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24),
    );
    return nights * booking.room.base_price;
  };

  const handleSubmit = async () => {
    try {
      if (!proofFile) return alert('Upload payment proof first');

      setUploading(true);
      const formData = new FormData();
      formData.append('file', proofFile);
      formData.append('upload_preset', 'easygo'); // your cloudinary preset

      const res = await fetch(
        `https://api.cloudinary.com/v1_1/<your-cloud-name>/image/upload`,
        {
          method: 'POST',
          body: formData,
        },
      );
      const data = await res.json();
      const proofUrl = data.secure_url;

      await createManualPayment({
        booking_id: bookingId as string,
        amount: getTotalPrice(), // sesuaikan dengan backend
        payment_proof_url: proofUrl,
      });

      alert('Pembayaran berhasil dikirim');
      router.push('/dashboard/booking/my-booking'); //ubah dengan masuk ke halaman dashboard atau riwayat pembayaran
    } catch (err) {
      console.error(err);
      alert('Gagal melakukan pembayaran');
    } finally {
      setUploading(false);
    }
  };

  if (!booking)
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
    <div className='bg-blue-50 min-h-screen flex items-center justify-center'>
      <div className="max-w-2xl mx-auto p-6 mt-8 bg-white rounded-xl shadow space-y-6">
      <div className="flex flex-col items-center text-center">
        <p className="text-gray-900">Waktu Menyelesaikan Pembayaran Tersisa</p>
        <p className="text-3xl font-bold text-green-600">{timeLeft}</p>
        <span className="text-sm bg-yellow-200 text-yellow-800 px-2 py-1 rounded mt-1">
          Waiting for Payment
        </span>
        <p className="text-xs mt-1 text-gray-500">
          Batas Pembayaran:{' '}
          {booking.expires_at
            ? new Date(booking.expires_at).toLocaleString()
            : 'Belum tersedia'}
        </p>
      </div>

      <div className="border rounded p-4 bg-gray-50">
        <div className="mb-2">
          <p className="text-sm text-gray-800">Kode Invoice</p>
          <p className="font-semibold text-blue-700">
            {booking.id.toUpperCase()}
          </p>
        </div>
        <div className="mb-2">
          <p className="text-sm text-gray-900">Transfer Ke</p>
          <p className="font-semibold text-blue-700">53210203221 A/n EasyGo</p>
        </div>
        <div className="mb-2">
          <p className="text-sm text-gray-900">Total Pembayaran</p>
          <p className="text-lg font-bold text-blue-700">
            Rp{' '}
            {(booking.payment?.amount || getTotalPrice()).toLocaleString(
              'id-ID',
            )}
          </p>
        </div>
      </div>

      <div>
        <label className="block font-semibold mb-2 text-gray-800">Upload Payment Proof</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProofFile(e.target.files?.[0] || null)}
          className="border p-2 w-full rounded text-gray-600"
        />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded"
        disabled={uploading}
      >
        {uploading ? 'Mengupload...' : 'Telah Melakukan Pembayaran'}
      </button>
    </div>
    </div>
  );
}
