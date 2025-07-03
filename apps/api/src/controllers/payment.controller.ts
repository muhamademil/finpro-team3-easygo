import { Request, Response } from 'express';
import { PaymentService } from '@/services/payment.service';

const service = new PaymentService();

export class PaymentController {
  public async createPayment(req: Request, res: Response): Promise<void> {
    try {
      const payload = req.body;
      const newPayment = await service.createPayment(payload);

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
      const payments = await service.getAllPayments();
      res.json(payments);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch payments', error });
    }
  }

  public async getPaymentById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const payment = await service.getPaymentById(id);
      if (!payment) {
        res.status(404).json({ message: 'Payment not found' });
        return;
      }
      res.json(payment);
    } catch (error) {
      res.status(500).json({ message: 'Failed to fetch payment', error });
    }
  }

  public async deletePayment(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      await service.deletePayment(id);
      res.json({ message: 'Payment deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Failed to delete payment', error });
    }
  }
}