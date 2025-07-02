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
    this.router.post('/bookings', this.controller.createBooking.bind(this.controller));
    this.router.get('/bookings/:id', this.controller.findBookingById.bind(this.controller));
    this.router.get('/bookings', this.controller.findAllBooking.bind(this.controller));
    this.router.put('/bookings/:id', this.controller.updateBookingStatus.bind(this.controller));
    this.router.delete('/bookings/:id', this.controller.deleteBooking.bind(this.controller));
  }

  public getRouter(): Router {
    return this.router;
  }
}
