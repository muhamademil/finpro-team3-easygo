import { prisma } from '@/prisma/client';
import { CreatePaymentInput } from '@/types/payment.types';

export class PaymentService {
  public async createPayment(data: CreatePaymentInput) {
    return await prisma.payment.create({ data });
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