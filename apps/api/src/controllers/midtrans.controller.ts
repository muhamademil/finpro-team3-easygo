import { Request, Response } from 'express';
import { MidtransService } from '../services/midtrans.service';

export class MidtransController {
  private service = new MidtransService();

  public createSnapTransaction = async (req: Request, res: Response): Promise<void> => {
    try {
      const redirectUrl = await this.service.createSnapTransaction(req.body);
      res.status(201).json({ redirectUrl });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  };

  public getSnapTransaction = async (req: Request, res: Response): Promise<void> => {
    try {
      const { bookingId } = req.params;
      const transaction = await this.service.getSnapTransaction(bookingId);
      res.status(200).json(transaction);
    } catch (error) {
      res.status(404).json({ error: (error as Error).message });
    }
  };
}
