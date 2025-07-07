// app/(dashboard)/dashboard/booking/page.tsx
'use client';

import { useState, useMemo } from 'react';
import type { Booking } from '@/types/type';
import { BookingCard } from '@/components/Features/Tenant/Booking/BookingCard';
import { BookingStatsCard } from '@/components/Features/Tenant/Booking/BookingStatsCard';
import {
  CreditCard,
  BedDouble,
  CheckCircle,
  XCircle,
  Clock,
  Ban,
} from 'lucide-react';
// Import modal dari ShadCN
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import Image from 'next/image';

// Data dummy (ganti dengan fetch API)
const dummyBookings: Booking[] = [
  {
    id: '#42311',
    bookedBy: {
      name: 'Aulia Nadia',
      phone: '0851 6278 8299',
      email: 'nadiaaul@mail.com',
      imageUrl: 'https://i.pravatar.cc/150?u=aulia',
    },
    schedule: { start: new Date('2025-06-02'), end: new Date('2025-06-04') },
    payment: {
      date: new Date('2025-06-01 13:20'),
      method: 'manual',
      proofUrl:
        'https://res.cloudinary.com/dohpngcuj/image/upload/v1750849989/promo1_l8hwic.png',
    },
    status: 'pending_confirmation',
  },
  {
    id: '#42312',
    bookedBy: {
      name: 'Rizky Pratama',
      phone: '0812 3456 7890',
      email: 'rizky@mail.com',
      imageUrl: 'https://i.pravatar.cc/150?u=rizky',
    },
    schedule: { start: new Date('2025-06-05'), end: new Date('2025-06-06') },
    payment: { date: new Date('2025-06-02 10:00'), method: 'midtrans' },
    status: 'confirmed',
  },
  {
    id: '#42313',
    bookedBy: {
      name: 'Siti Aminah',
      phone: '0878 1111 2222',
      email: 'siti@mail.com',
      imageUrl: 'https://i.pravatar.cc/150?u=siti',
    },
    schedule: { start: new Date('2025-06-07'), end: new Date('2025-06-09') },
    payment: {
      date: new Date('2025-06-03 15:45'),
      method: 'manual',
      proofUrl:
        'https://res.cloudinary.com/dohpngcuj/image/upload/v1750849989/promo2_e7kviq.png',
    },
    status: 'completed',
  },
  {
    id: '#42314',
    bookedBy: {
      name: 'Budi Santoso',
      phone: '0821 9876 5432',
      email: 'budi@mail.com',
      imageUrl: 'https://i.pravatar.cc/150?u=budi',
    },
    schedule: { start: new Date('2025-06-10'), end: new Date('2025-06-11') },
    payment: {
      date: new Date('2025-06-04 09:10'),
      method: 'manual',
      proofUrl: '...',
    },
    status: 'rejected',
  },
  {
    id: '#42315',
    bookedBy: {
      name: 'Dewi Lestari',
      phone: '0855 1234 5678',
      email: 'dewi@mail.com',
      imageUrl: 'https://i.pravatar.cc/150?u=dewi',
    },
    schedule: { start: new Date('2025-06-12'), end: new Date('2025-06-15') },
    payment: { date: new Date('2025-06-05 11:30'), method: 'midtrans' },
    status: 'cancelled',
  },
];

export default function BookingPage() {
  const [mainTab, setMainTab] = useState<'Payments' | 'Rooms'>('Payments');
  const [subTab, setSubTab] = useState<
    'All' | 'Antrian' | 'Approved' | 'Reject'
  >('All');
  const [bookings, setBookings] = useState<Booking[]>(dummyBookings);

  // State untuk modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [proofUrl, setProofUrl] = useState('');

  // Logika untuk menghitung statistik
  const stats = useMemo(
    () => ({
      queuePayment: bookings.filter((b) => b.status === 'pending_confirmation')
        .length,
      approvePayment: bookings.filter(
        (b) =>
          b.status === 'confirmed' ||
          b.status === 'completed' ||
          b.status === 'cancelled',
      ).length,
      rejectPayment: bookings.filter((b) => b.status === 'rejected').length,
      queueRooms: bookings.filter((b) => b.status === 'confirmed').length,
      approveRooms: bookings.filter((b) => b.status === 'completed').length,
      cancelRooms: bookings.filter((b) => b.status === 'cancelled').length,
    }),
    [bookings],
  );

  // Logika untuk memfilter data booking sesuai tab
  const filteredBookings = useMemo(() => {
    let list = bookings;

    if (mainTab === 'Payments') {
      if (subTab === 'Antrian')
        list = bookings.filter((b) => b.status === 'pending_confirmation');
      if (subTab === 'Approved')
        list = bookings.filter(
          (b) =>
            b.status === 'confirmed' ||
            b.status === 'completed' ||
            b.status === 'cancelled',
        );
      if (subTab === 'Reject')
        list = bookings.filter((b) => b.status === 'rejected');
    } else {
      // Rooms
      if (subTab === 'Antrian')
        list = bookings.filter((b) => b.status === 'confirmed');
      if (subTab === 'Approved')
        list = bookings.filter((b) => b.status === 'completed');
      if (subTab === 'Reject')
        list = bookings.filter((b) => b.status === 'cancelled');
    }
    return list;
  }, [bookings, mainTab, subTab]);

  const handleApprove = (id: string) => {
    // Simulasi API call
    console.log(`Approving ${id}`);
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;
        if (mainTab === 'Payments') return { ...b, status: 'confirmed' };
        if (mainTab === 'Rooms') return { ...b, status: 'completed' };
        return b;
      }),
    );
  };
  const handleReject = (id: string) => {
    // Simulasi API call
    console.log(`Rejecting ${id}`);
    setBookings((prev) =>
      prev.map((b) => {
        if (b.id !== id) return b;
        if (mainTab === 'Payments') return { ...b, status: 'rejected' };
        if (mainTab === 'Rooms') return { ...b, status: 'cancelled' };
        return b;
      }),
    );
  };
  const handleShowProof = (url: string) => {
    setProofUrl(url);
    setIsModalOpen(true);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Booking</h1>

      {/* Statistik Atas */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <BookingStatsCard
          title="Queue Payment"
          count={stats.queuePayment}
          icon={Clock}
          color="text-yellow-600 bg-yellow-100"
        />
        <BookingStatsCard
          title="Approve Payment"
          count={stats.approvePayment}
          icon={CreditCard}
          color="text-green-600 bg-green-100"
        />
        <BookingStatsCard
          title="Reject Payment"
          count={stats.rejectPayment}
          icon={XCircle}
          color="text-red-600 bg-red-100"
        />
        <BookingStatsCard
          title="Queue Rooms"
          count={stats.queueRooms}
          icon={BedDouble}
          color="text-blue-600 bg-blue-100"
        />
        <BookingStatsCard
          title="Approve Rooms"
          count={stats.approveRooms}
          icon={CheckCircle}
          color="text-green-600 bg-green-100"
        />
        <BookingStatsCard
          title="Cancel Rooms"
          count={stats.cancelRooms}
          icon={Ban}
          color="text-red-600 bg-red-100"
        />
      </div>

      {/* Tabs Utama */}
      <div className="flex border-b mb-6">
        <button
          onClick={() => setMainTab('Payments')}
          className={`px-4 py-2 text-sm font-semibold ${mainTab === 'Payments' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
        >
          Payments
        </button>
        <button
          onClick={() => setMainTab('Rooms')}
          className={`px-4 py-2 text-sm font-semibold ${mainTab === 'Rooms' ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}
        >
          Rooms
        </button>
      </div>

      {/* Sub-Tabs */}
      <div className="flex items-center gap-4 mb-6">
        {(['All', 'Antrian', 'Approved', 'Reject'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setSubTab(tab)}
            className={`px-3 py-1.5 text-sm rounded-full ${subTab === tab ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-700'}`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Daftar Booking */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredBookings.map((booking) => (
          <BookingCard
            key={booking.id}
            booking={booking}
            onApprove={handleApprove}
            onReject={handleReject}
            onShowProof={handleShowProof}
            mainTab={mainTab}
          />
        ))}
      </div>

      {/* Modal untuk Payment Proof */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Payment Proof</DialogTitle>
          </DialogHeader>
          <div className="relative w-full aspect-square mt-4">
            <Image
              src={proofUrl}
              alt="Payment proof"
              fill
              className="object-contain"
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
