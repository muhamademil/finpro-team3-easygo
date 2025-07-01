// src/routers/room.router.ts
import { Router } from 'express';
import { PaymentController } from '@/controllers/payment.controller';

export class PaymentRouter {
  private router = Router();
  private controller = new PaymentController();

  constructor() {
    this.setRoutes();
  }

  private setRoutes(): void {
    this.router.post('/payments', this.controller.createPayment.bind(this.controller));
    this.router.get('/payments', this.controller.getAllPayments.bind(this.controller));
    this.router.get('/payments/:id', this.controller.getPaymentById.bind(this.controller));
    this.router.delete('/payments/:id', this.controller.deletePayment.bind(this.controller));
  }

  public getRouter(): Router {
    return this.router;
  }
}
