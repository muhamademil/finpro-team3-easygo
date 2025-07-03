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

  public async deletePayment(id: string) {
    return await prisma.payment.delete({ where: { id } });
  }
}
