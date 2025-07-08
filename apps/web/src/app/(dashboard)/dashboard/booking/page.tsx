'use client';

import { useEffect, useState, useMemo } from 'react';
import type { Booking, BookingCardData } from '@/types/booking.types';
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
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  getBookingsForTenant,
  approveBooking,
  rejectBooking,
} from '@/api/booking.service';
import Image from 'next/image';

const MAIN_TABS = ['Payments', 'Rooms'] as const;
const SUB_TABS = ['All', 'Antrian', 'Approved', 'Reject'] as const;

export default function BookingPage() {
  const [mainTab, setMainTab] = useState<'Payments' | 'Rooms'>('Payments');
  const [subTab, setSubTab] = useState<(typeof SUB_TABS)[number]>('All');
  const [bookings, setBookings] = useState<BookingCardData[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [proofUrl, setProofUrl] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result: Booking[] = await getBookingsForTenant();

        const sorted = [...result].sort(
          (a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        );

        const mapped = sorted.map<BookingCardData>((b) => ({
          id: b.id,
          check_in: b.check_in,
          check_out: b.check_out,
          status: b.status,
          payment_method: b.payment_method,
          phone: b.phone,
          user: {
            name: b.full_name,
            email: b.email,
            phone: b.phone,
            imageUrl:
              'https://i.pinimg.com/736x/58/79/29/5879293da8bd698f308f19b15d3aba9a.jpg',
          },
          payment: {
            amount: b.payment?.amount ?? 0,
            date: b.created_at,
            method: b.payment_method,
            proofUrl:
              b.payment_method === 'MANUAL'
                ? (b.payment?.payment_proof_url ?? '')
                : undefined,
          },
        }));

        setBookings(mapped);
      } catch (err) {
        console.error('Failed to load tenant bookings:', err);
      }
    };
    fetchData();
  }, []);

  const stats = useMemo(() => {
    return {
      queuePayment: bookings.filter((b) => b.status === 'PENDING_CONFIRMATION')
        .length,
      approvePayment: bookings.filter((b) =>
        ['CONFIRMED', 'COMPLETED', 'CANCELLED'].includes(b.status),
      ).length,
      rejectPayment: 0,
      queueRooms: bookings.filter((b) => b.status === 'CONFIRMED').length,
      approveRooms: bookings.filter((b) => b.status === 'COMPLETED').length,
      cancelRooms: bookings.filter((b) => b.status === 'CANCELLED').length,
    };
  }, [bookings]);

  const filteredBookings = useMemo(() => {
    let list = bookings;
    if (mainTab === 'Payments') {
      if (subTab === 'Antrian') {
        list = bookings.filter((b) => b.status === 'PENDING_CONFIRMATION');
      } else if (subTab === 'Approved') {
        list = bookings.filter((b) =>
          ['CONFIRMED', 'COMPLETED', 'CANCELLED'].includes(b.status),
        );
      } else if (subTab === 'Reject') {
        list = [];
      }
    } else {
      if (subTab === 'Antrian') {
        list = bookings.filter((b) => b.status === 'CONFIRMED');
      } else if (subTab === 'Approved') {
        list = bookings.filter((b) => b.status === 'COMPLETED');
      } else if (subTab === 'Reject') {
        list = bookings.filter((b) => b.status === 'CANCELLED');
      }
    }
    return list;
  }, [bookings, mainTab, subTab]);

  const handleApprove = async (id: string) => {
    try {
      const updated = await approveBooking(id);
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status: updated.status } : b)),
      );
    } catch (err) {
      console.error('Failed to approve booking:', err);
    }
  };

  const handleReject = async (id: string) => {
    try {
      const updated = await rejectBooking(id);
      setBookings((prev) =>
        prev.map((b) =>
          b.id === id
            ? {
                ...b,
                status: 'CANCELLED',
              }
            : b,
        ),
      );
    } catch (err) {
      console.error('Failed to reject booking:', err);
    }
  };

  const handleShowProof = (url: string) => {
    if (!url) {
      alert('No proof URL available!');
      return;
    }
    setProofUrl(url);
    setIsModalOpen(true);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8">Booking</h1>

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

      <div className="flex border-b mb-6">
        {MAIN_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setMainTab(tab)}
            className={`px-4 py-2 text-sm font-semibold ${
              mainTab === tab
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-4 mb-6">
        {SUB_TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setSubTab(tab)}
            className={`px-3 py-1.5 text-sm rounded-full ${
              subTab === tab
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

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
