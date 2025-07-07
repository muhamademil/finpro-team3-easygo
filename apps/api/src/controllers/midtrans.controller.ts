import { Request, Response } from 'express';
import { MidtransService } from '../services/midtrans.service';

export class MidtransController {
  private service = new MidtransService();

  public createSnapTransaction = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const redirectUrl = await this.service.createSnapTransaction(req.body);
      res.status(201).json({ redirectUrl });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };

  public getSnapTransaction = async (
    req: Request,
    res: Response,
  ): Promise<void> => {
    try {
      const { bookingId } = req.params;
      const transaction = await this.service.getSnapTransaction(bookingId);
      res.status(200).json(transaction);
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  };

  public handleWebhook = async (
    req: Request,
    res: Response,
  ): Promise<Response> => {
    try {
      console.log('📩 Received Midtrans webhook body:');
      console.log(JSON.stringify(req.body, null, 2));

      await this.service.handleTransactionStatusUpdate(req.body);
      console.log('📩 Received webhook from Midtrans:', req.body);

      return res
        .status(200)
        .json({ message: 'Webhook processed successfully' });
    } catch (error) {
      console.error('Midtrans Webhook Error:', error);
      return res.status(500).json({ message: 'Webhook processing failed' });
    }
  };
}
