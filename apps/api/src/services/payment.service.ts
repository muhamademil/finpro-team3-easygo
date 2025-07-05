import { prisma } from '@/prisma/client';
import { CreatePaymentInput } from '@/types/payment.types';
import { BookingStatus } from '@prisma/client';

export class PaymentService {
  public async createPayment(data: CreatePaymentInput) {
    const [payment] = await prisma.$transaction([
      prisma.payment.create({
        data: {
          booking_id: data.booking_id,
          amount: data.amount,
          payment_proof_url: data.payment_proof_url,
          paid_at: new Date(),
        },
      }),
      prisma.booking.update({
        where: { id: data.booking_id },
        data: {
          status: BookingStatus.PENDING_CONFIRMATION,
          expires_at: null,
        },
      }),
    ]);

    return payment;
  }

  public async getAllPayments() {
    return await prisma.payment.findMany({ include: { booking: true } });
  }

  public async getPaymentById(id: string) {
    return await prisma.payment.findUnique({
      where: { id },
      include: { booking: true },
    });
  }

  public async confirmManualPayment(bookingId: string) {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { payment: true },
    });

    if (!booking) throw new Error('Booking not found');
    if (!booking.payment) throw new Error('No payment found');
    if (booking.status !== BookingStatus.PENDING_CONFIRMATION) {
      throw new Error('Booking not awaiting confirmation');
    }

    return await prisma.booking.update({
      where: { id: bookingId },
      data: {
        // status: BookingStatus.COMPLETED,
        status: 'PENDING_CONFIRMATION',
        payment_method: 'MANUAL',
      },
    });
  }

  public async deletePayment(id: string) {
    return await prisma.payment.delete({ where: { id } });
  }
}
