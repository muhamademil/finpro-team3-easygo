import { Request, Response } from 'express';
import { BookingService } from '@/services/booking.service';

const service = new BookingService();

export class BookingController {
  public async createBooking(req: Request, res: Response) {
    try {
      const data = req.body;
      const booking = await service.createBooking(data);
      res.status(201).json({
        message: 'Booking created successfully',
        data: booking,
      });
    } catch (err) {
      res.status(500).json({ message: 'Failed to create booking', error: err });
    }
  }

  public async findAllBooking(req: Request, res: Response) {
    try {
      const bookings = await service.findAllBooking();
      res.json(bookings);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch bookings', error: err });
    }
  }

  public async findBookingById(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const booking = await service.findBookingById(id);
      if (!booking) return res.status(404).json({ message: 'Not found' });
      res.json(booking);
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch booking', error: err });
    }
  }

  public async updateBookingStatus(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const booking = await service.updateBookingStatus(id, req.body);
      res.json(booking);
    } catch (err) {
      res.status(500).json({ message: 'Failed to update booking', error: err });
    }
  }

  public async deleteBooking(req: Request, res: Response) {
    try {
      const { id } = req.params;
      await service.deleteBooking(id);
      res.json({ message: 'Booking deleted' });
    } catch (err) {
      res.status(500).json({ message: 'Failed to delete booking', error: err });
    }
  }
}
