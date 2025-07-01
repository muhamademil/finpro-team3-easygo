// src/routers/booking.router.ts
import { Router } from 'express';
import { BookingController } from '@/controllers/booking.controller';

export class BookingRouter {
  private router = Router();
  private controller = new BookingController();

  constructor() {
    this.setRoutes();
  }

  private setRoutes(): void {
    this.router.post('/bookings', this.controller.create.bind(this.controller));
    this.router.get('/bookings/user/:userId', this.controller.findAllByUser.bind(this.controller));
    this.router.get('/bookings/:id', this.controller.findById.bind(this.controller));
    this.router.put('/bookings/:id', this.controller.update.bind(this.controller));
    this.router.put('/bookings/:id/payment-status', this.controller.updatePaymentStatus.bind(this.controller));
    this.router.delete('/bookings/:id', this.controller.delete.bind(this.controller));
  }

  public getRouter(): Router {
    return this.router;
  }
}
