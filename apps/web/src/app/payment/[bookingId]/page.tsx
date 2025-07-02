'use client';

import { useParams, useRouter } from 'next/navigation';
import { useState } from 'react';
import { createManualPayment } from '@/api/payment.service';

export default function ManualPaymentPage() {
  const { bookingId } = useParams();
  const router = useRouter();

  const [amount, setAmount] = useState('');
  const [proofUrl, setProofUrl] = useState('');

  const handleSubmit = async () => {
    try {
      await createManualPayment({
        booking_id: bookingId as string,
        amount: Number(amount),
        payment_proof_url: proofUrl,
      });
      alert('Pembayaran berhasil dikirim');
      router.push('/dashboard');
    } catch (err) {
      console.error(err);
      alert('Gagal melakukan pembayaran');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-8 bg-white rounded-xl shadow mt-10 space-y-6">
      <h1 className="text-2xl font-bold text-gray-700">Manual Payment</h1>
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full border p-3 rounded text-gray-700"
      />
      <input
        type="text"
        placeholder="Payment Proof URL"
        value={proofUrl}
        onChange={(e) => setProofUrl(e.target.value)}
        className="w-full border p-3 rounded text-gray-700"
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
      >
        Submit Payment
      </button>
    </div>
  );
}
