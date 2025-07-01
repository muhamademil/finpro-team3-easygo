import { Request, Response } from 'express';
import { prisma } from '@/lib/prisma';
import { BookingStatus } from '@prisma/client';

export class MidtransController {
  public async handleWebhook(req: Request, res: Response): Promise<void> {
    try {
      const { order_id, transaction_status } = req.body;

      let newStatus: BookingStatus | null = null;

      if (transaction_status === 'settlement') {
        newStatus = BookingStatus.MENUNGGU_KONFIRMASI;
      } else if (
        ['expire', 'cancel', 'deny', 'failure'].includes(transaction_status)
      ) {
        newStatus = BookingStatus.DIBATALKAN;
      }

      if (newStatus) {
        await prisma.booking.update({
          where: { id: Number(order_id) },
          data: { status: newStatus },
        });
      }

      res.status(200).json({ message: 'Webhook processed', status: newStatus });
    } catch (error) {
      console.error('Webhook error:', error);
      res.status(500).json({ message: 'Webhook error', error });
    }
  }
}
