// components/features/booking/BookingCard.tsx
import type { Booking } from '@/lib/type';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import Image from 'next/image';
import Button from '@/components/Elements/Button';

// Fungsi untuk styling badge status
const getStatusBadge = (status: Booking['status']) => {
  const styles = {
    pending_confirmation: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-blue-100 text-blue-800',
    completed: 'bg-green-100 text-green-800',
    rejected: 'bg-red-100 text-red-800',
    cancelled: 'bg-red-100 text-red-800',
    pending_payment: 'bg-gray-100 text-gray-800',
  };
  const text = {
    pending_confirmation: 'Waiting Payment Approval',
    confirmed: 'Waiting Room Approval',
    completed: 'Completed',
    rejected: 'Payment Rejected',
    cancelled: 'Room Cancelled',
    pending_payment: 'Waiting Payment',
  };
  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}
    >
      {text[status]}
    </span>
  );
};

type BookingCardProps = {
  booking: Booking;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  onShowProof: (url: string) => void;
  mainTab: 'Payments' | 'Rooms';
};

export const BookingCard: React.FC<BookingCardProps> = ({
  booking,
  onApprove,
  onReject,
  onShowProof,
  mainTab,
}) => {
  const canApproveRejectPayment =
    mainTab === 'Payments' && booking.status === 'pending_confirmation';
  const canApproveRejectRoom =
    mainTab === 'Rooms' && booking.status === 'confirmed';

  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center p-4 border-b">
        <p className="font-semibold text-sm">{booking.id}</p>
        {getStatusBadge(booking.status)}
      </CardHeader>
      <CardContent className="p-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div className="flex items-center gap-2">
          <Image
            src={booking.bookedBy.imageUrl}
            alt={booking.bookedBy.name}
            width={24}
            height={24}
            className="rounded-full"
          />
          <span>{booking.bookedBy.name}</span>
        </div>
        <div>
          <span className="text-gray-500">Phone:</span> {booking.bookedBy.phone}
        </div>
        <div>
          <span className="text-gray-500">Schedule:</span>{' '}
          {booking.schedule.start.toLocaleDateString()} -{' '}
          {booking.schedule.end.toLocaleDateString()}
        </div>
        <div>
          <span className="text-gray-500">Email:</span> {booking.bookedBy.email}
        </div>
        <div>
          <span className="text-gray-500">Payment Date:</span>{' '}
          {booking.payment.date.toLocaleString()}
        </div>
        {booking.payment.method === 'manual' ? (
          <button
            onClick={() => onShowProof(booking.payment.proofUrl!)}
            className="text-blue-600 hover:underline text-left"
          >
            Payment Proof
          </button>
        ) : (
          <p>
            <span className="text-gray-500">Payment:</span> by Midtrans
          </p>
        )}
      </CardContent>
      <CardFooter className="p-4 bg-gray-50">
        {canApproveRejectPayment && (
          <div className="w-full grid grid-cols-2 gap-3">
            <Button variant="outlined" onClick={() => onReject(booking.id)}>
              Reject
            </Button>
            <Button variant="solid" onClick={() => onApprove(booking.id)}>
              Approve
            </Button>
          </div>
        )}
        {canApproveRejectRoom && (
          <div className="w-full grid grid-cols-2 gap-3">
            <Button variant="outlined" onClick={() => onReject(booking.id)}>
              Cancel Room
            </Button>
            <Button variant="solid" onClick={() => onApprove(booking.id)}>
              Approve Room
            </Button>
          </div>
        )}
        {booking.status === 'confirmed' && mainTab === 'Payments' && (
          <p className="text-sm text-green-600 font-medium">Already Approved</p>
        )}
        {booking.status === 'rejected' && (
          <p className="text-sm text-red-600 font-medium">Already Rejected</p>
        )}
        {booking.status === 'completed' && (
          <p className="text-sm text-green-600 font-medium">Room Approved</p>
        )}
        {booking.status === 'cancelled' && (
          <p className="text-sm text-red-600 font-medium">Room Cancelled</p>
        )}
      </CardFooter>
    </Card>
  );
};
