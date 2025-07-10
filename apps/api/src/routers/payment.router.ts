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
      '/',
      authMiddleware,
      this.controller.createPayment.bind(this.controller),
    );
    this.router.get(
      '/',
      authMiddleware,
      this.controller.getAllPayments.bind(this.controller),
    );
    this.router.get(
      '/:id',
      authMiddleware,
      this.controller.getPaymentById.bind(this.controller),
    );
    this.router.delete(
      '/:id',
      authMiddleware,
      this.controller.deletePayment.bind(this.controller),
    );
    this.router.post(
      '/midtrans-webhook',
      authMiddleware,
      this.midtransController.handleWebhook.bind(this.midtransController),
    );

    this.router.post(
      '/snap',
      authMiddleware,
      this.midtransController.createSnapTransaction.bind(
        this.midtransController,
      ),
    );
    this.router.post(
      '/snap/:bookingId',
      authMiddleware,
      this.midtransController.getSnapTransaction.bind(this.midtransController),
    );
    this.router.patch(
      '/confirm/:bookingId',
      authMiddleware,
      this.controller.confirmManualPayment.bind(this.controller),
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
