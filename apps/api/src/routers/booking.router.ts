// src/routers/booking.router.ts
import { Router } from 'express';
import { BookingController } from '../controllers/booking.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { tenantMiddleware } from '../middleware/tenant.middleware';

export class BookingRouter {
  private router = Router();
  private controller = new BookingController();

  constructor() {
    this.setRoutes();
  }

  private setRoutes(): void {
    this.router.post(
      '/bookings',
      authMiddleware,
      this.controller.createBooking.bind(this.controller),
    );
    this.router.get(
      '/bookings/me',
      authMiddleware,
      this.controller.findMyBookings.bind(this.controller),
    );
    this.router.get(
      '/bookings/:id',
      authMiddleware,
      this.controller.findBookingById.bind(this.controller),
    );
    this.router.get(
      '/bookings',
      authMiddleware,
      tenantMiddleware,
      this.controller.findAllBooking.bind(this.controller),
    );
    this.router.put(
      '/bookings/:id',
      authMiddleware,
      tenantMiddleware,
      this.controller.updateBookingStatus.bind(this.controller),
    );
    this.router.patch(
      '/bookings/:id/approve',
      authMiddleware,
      tenantMiddleware,
      this.controller.approveBooking.bind(this.controller),
    );
    this.router.patch(
      '/bookings/:id/reject',
      authMiddleware,
      tenantMiddleware,
      this.controller.rejectBooking.bind(this.controller),
    );
    this.router.delete(
      '/bookings/:id',
      authMiddleware,
      tenantMiddleware,
      this.controller.deleteBooking.bind(this.controller),
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
