import { Request, Response } from 'express';
import { PaymentService } from '@/services/payment.service';

// const service = new PaymentService();

export class PaymentController {
  private service = new PaymentService();
  public async createPayment(req: Request, res: Response): Promise<void> {
    try {
      const payload = req.body;
      const newPayment = await this.service.createPayment(payload);

      res.status(201).json({
        message: 'Payment created successfully',
        data: newPayment,
      });
    } catch (error) {
      console.error('❌ Create Payment Error:', error);
      res.status(500).json({ message: 'Failed to create payment', error });
    }
  }

  public async getAllPayments(req: Request, res: Response): Promise<void> {
    try {
      const payments = await this.service.getAllPayments();
      res.json(payments);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch payments', error });
    }
  }

  public async getPaymentById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const payment = await this.service.getPaymentById(id);
      if (!payment) {
        res.status(404).json({ message: 'Payment not found' });
        return;
      }
      res.json(payment);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch payment', error });
    }
  }

  public confirmManualPayment = async (req: Request, res: Response) => {
    try {
      const { bookingId } = req.params;

      const updated = await this.service.confirmManualPayment(bookingId);
      res.status(200).json({
        message: 'Payment confirmed. Booking Completed.',
        data: updated,
      });
    } catch (error: any) {
      console.error(error);
      res.status(400).json({
        message: 'Failed to fetch confirmed. Booking Completed',
        error: error instanceof Error ? error.message : error,
      });
    }
  };

  public async deletePayment(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await this.service.deletePayment(id);
      res.json({ message: 'Payment deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete payment', error });
    }
  }
}
