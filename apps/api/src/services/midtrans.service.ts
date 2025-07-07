import axios from 'axios';
import dotenv from 'dotenv';
import { prisma } from '@/lib/prisma';
import { addMinutes, format } from 'date-fns';

dotenv.config();

const EXPIRE_MINUTES = 120;

export class MidtransService {
  private readonly serverKey = process.env.MIDTRANS_SERVER_KEY!;
  private readonly baseSnap = process.env.MIDTRANS_SNAP_DEVELOPMENT!;
  private readonly baseCore = process.env.MIDTRANS_CORE_DEVELOPMENT!;

  private getAuthHeader(): string {
    const encoded = Buffer.from(`${this.serverKey}:`).toString('base64');
    return `Basic ${encoded}`;
  }

  private formatMidtransTime(date: Date): string {
    return format(date, 'yyyy-MM-dd HH:mm:ss') + ' +0700';
  }

  public async createSnapTransaction(data: {
    bookingId: string;
  }): Promise<string> {
    const { bookingId } = data;

    if (!bookingId) throw new Error('bookingId is required');

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { user: true, room: true },
    });

    if (!booking) throw new Error('Booking not found');

    const nights =
      (booking.check_out.getTime() - booking.check_in.getTime()) /
      (1000 * 60 * 60 * 24);

    if (isNaN(nights) || nights <= 0)
      throw new Error('Invalid check-in/check-out dates');

    const totalPrice = booking.room.base_price * nights;

    const expiresAt = addMinutes(new Date(), EXPIRE_MINUTES);

    await prisma.booking.update({
      where: { id: booking.id },
      data: { expires_at: expiresAt },
    });

    const snapPayload = {
      transaction_details: {
        order_id: booking.id,
        gross_amount: totalPrice,
      },
      customer_details: {
        first_name: booking.full_name,
        email: booking.email,
        phone: booking.phone,
      },
      item_details: [
        {
          id: `ROOM-${booking.room.id}`,
          name: booking.room.name,
          quantity: nights,
          price: booking.room.base_price,
        },
      ],
      expiry: {
        start_time: this.formatMidtransTime(new Date()),
        unit: 'minutes',
        duration: EXPIRE_MINUTES,
      },
    };

    // console.log(
    //   'Sending Snap payload:',
    //   JSON.stringify(snapPayload, null, 2),
    // );

    const response = await axios.post(this.baseSnap, snapPayload, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.getAuthHeader(),
      },
    });

    return response.data.redirect_url;
  }

  public async getSnapTransaction(bookingId: string): Promise<any> {
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: { user: true, room: true },
    });

    if (!booking) throw new Error('Booking not found');

    return {
      user: booking.full_name,
      email: booking.email,
      room: booking.room.name,
      check_in: booking.check_in,
      check_out: booking.check_out,
      payment_method: booking.payment_method,
      status: booking.status,
    };
  }

  public async handleTransactionStatusUpdate(payload: any): Promise<void> {
    const {
      order_id,
      transaction_status,
      fraud_status,
      payment_type,
      transaction_id,
      gross_amount,
    } = payload;

    if (!order_id) throw new Error('order_id is missing');

    console.log(
      `[MIDTRANS] Webhook - order_id: ${order_id}, status: ${transaction_status}, payment_type: ${payment_type}, fraud_status: ${fraud_status}`,
    );

    const amount = Number(gross_amount || 0);

    if (
      transaction_status === 'settlement' ||
      transaction_status === 'capture'
    ) {
      const existingPayment = await prisma.payment.findUnique({
        where: { booking_id: order_id },
      });

      if (!existingPayment) {
        await prisma.payment.create({
          data: {
            booking_id: order_id,
            amount,
            paid_at: new Date(),
            payment_proof_url: null,
          },
        });
        console.log('✅ Payment created');
      }

      const updated = await prisma.booking.update({
        where: { id: order_id },
        data: {
          status: 'CONFIRMED',
          payment_method: 'MIDTRANS',
        },
      });
      console.log('✅ Booking status updated to CONFIRMED:', updated.id);
    }

    if (transaction_status === 'expire' || transaction_status === 'cancel') {
      await prisma.booking.update({
        where: { id: order_id },
        data: {
          status: 'CANCELLED',
        },
      });
      console.log('🛑 Booking status updated to CANCELLED');
    }
  }
}
