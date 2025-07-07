// components/features/booking/BookingCard.tsx
import type { BookingCardData } from '@/types/booking.types';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import Image from 'next/image';
import Button from '@/components/Elements/Button';

const getStatusBadge = (status: BookingCardData['status']) => {
  const styles = {
    PENDING_CONFIRMATION: 'bg-yellow-100 text-yellow-800',
    CONFIRMED: 'bg-blue-100 text-blue-800',
    COMPLETED: 'bg-green-100 text-green-800',
    CANCELLED: 'bg-red-100 text-red-800',
    PENDING_PAYMENT: 'bg-gray-100 text-gray-800',
  } as const;
  const text = {
    PENDING_CONFIRMATION: 'Waiting Payment Approval',
    CONFIRMED: 'Waiting Room Approval',
    COMPLETED: 'Completed',
    CANCELLED: 'Room Cancelled',
    PENDING_PAYMENT: 'Waiting Payment',
  } as const;
  return (
    <span
      className={`px-2 py-1 text-xs font-medium rounded-full ${styles[status]}`}
    >
      {text[status]}
    </span>
  );
};

type BookingCardProps = {
  booking: BookingCardData;
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
    mainTab === 'Payments' && booking.status === 'PENDING_CONFIRMATION';
  const canApproveRejectRoom =
    mainTab === 'Rooms' && booking.status === 'CONFIRMED';
  return (
    <Card>
      <CardHeader className="flex flex-row justify-between items-center p-4 border-b">
        <p className="font-semibold text-sm">{booking.id}</p>
        {getStatusBadge(booking.status)}
      </CardHeader>
      <CardContent className="p-4 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
        <div className="flex items-center gap-2">
          <Image
            src={booking.user.imageUrl || '/default-avatar.png'}
            alt={booking.user.name}
            width={24}
            height={24}
            className="rounded-full"
          />
          <span>{booking.user.name}</span>
        </div>
        <div>
          <span className="text-gray-500">Phone:</span> {booking.phone}
        </div>
        <div>
          <span className="text-gray-500">Schedule:</span>{' '}
          {new Date(booking.check_in).toLocaleDateString()} -{' '}
          {new Date(booking.check_out).toLocaleDateString()}
        </div>
        <div>
          <span className="text-gray-500">Email:</span> {booking.user.email}
        </div>
        <div>
          <span className="text-gray-500">Payment Amount:</span> Rp
          {booking.payment?.amount?.toLocaleString() ?? '0'}
        </div>
        {booking.payment_method === 'MANUAL' && booking.payment?.proofUrl ? (
          <button
            onClick={() => onShowProof(booking.payment!.proofUrl!)}
            className="text-blue-600 hover:underline text-left"
          >
            View Payment Proof
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
        {booking.status === 'CONFIRMED' && mainTab === 'Payments' && (
          <p className="text-sm text-green-600 font-medium">Already Approved</p>
        )}
        {booking.status === 'COMPLETED' && (
          <p className="text-sm text-green-600 font-medium">Room Approved</p>
        )}
        {booking.status === 'CANCELLED' && (
          <p className="text-sm text-red-600 font-medium">Room Cancelled</p>
        )}
      </CardFooter>
    </Card>
  );
};
