// src/routers/booking.router.ts
import { Router } from 'express';
import { BookingController } from '@/controllers/booking.controller';
import { authMiddleware } from '@/middleware/auth.middleware';
import { tenantMiddleware } from '@/middleware/tenant.middleware';

export class BookingRouter {
  private router = Router();
  private controller = new BookingController();

  constructor() {
    this.setRoutes();
  }

  private setRoutes(): void {
    this.router.post(
      '/',
      authMiddleware,
      this.controller.createBooking.bind(this.controller),
    );
    this.router.get(
      '/me',
      authMiddleware,
      this.controller.findMyBookings.bind(this.controller),
    );
    this.router.get(
      '/:id',
      authMiddleware,
      this.controller.findBookingById.bind(this.controller),
    );
    this.router.get(
      '/',
      authMiddleware,
      tenantMiddleware,
      this.controller.findAllBooking.bind(this.controller),
    );
    this.router.put(
      '/:id',
      authMiddleware,
      tenantMiddleware,
      this.controller.updateBookingStatus.bind(this.controller),
    );
    this.router.patch(
      '/:id/approve',
      authMiddleware,
      tenantMiddleware,
      this.controller.approveBooking.bind(this.controller),
    );
    this.router.patch(
      '/:id/reject',
      authMiddleware,
      tenantMiddleware,
      this.controller.rejectBooking.bind(this.controller),
    );
    this.router.delete(
      '/:id',
      authMiddleware,
      tenantMiddleware,
      this.controller.deleteBooking.bind(this.controller),
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
