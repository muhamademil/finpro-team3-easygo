import { Router } from 'express';
import { PaymentController } from '@/controllers/payment.controller';
import { MidtransController } from '@/controllers/midtrans.controller';
import { authMiddleware } from '@/middleware/auth.middleware';
import { tenantMiddleware } from '@/middleware/tenant.middleware';

export class PaymentRouter {
  private router = Router();
  private controller = new PaymentController();
  private midtransController = new MidtransController();

  constructor() {
    this.setRoutes();
  }

  private setRoutes(): void {
    this.router.post(
      '/payments',
      this.controller.createPayment.bind(this.controller),
    );
    this.router.get(
      '/payments',
      this.controller.getAllPayments.bind(this.controller),
    );
    this.router.get(
      '/payments/:id',
      this.controller.getPaymentById.bind(this.controller),
    );
    this.router.delete(
      '/payments/:id',
      this.controller.deletePayment.bind(this.controller),
    );
    this.router.post(
      '/payments/midtrans-webhook',
      this.midtransController.handleWebhook.bind(this.midtransController),
    );

    this.router.post(
      '/payments/snap',
      this.midtransController.createSnapTransaction.bind(
        this.midtransController,
      ),
    );
    this.router.post(
      '/payments/snap/:bookingId',
      this.midtransController.getSnapTransaction.bind(this.midtransController),
    );
    this.router.patch(
      '/payments/confirm/:bookingId',
      this.controller.confirmManualPayment.bind(this.controller),
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
