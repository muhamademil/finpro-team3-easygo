import { Request, Response } from 'express';
import { BookingService } from '@/services/booking.service';

const service = new BookingService();

export class BookingController {
  public async createBooking(req: Request, res: Response) {
    try {
      const data = req.body;
      console.log('📦 Booking data received:', data);

      const booking = await service.createBooking(data);
      res.status(201).json({
        message: 'Booking created successfully',
        data: booking,
      });
    } catch (err) {
      console.error('❌ Create booking error:', err); 
      
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

      if (!booking) {
        return res.status(404).json({ message: 'Booking not found' });
      }

      // 🔐 Validasi jika user login (TRAVELLER) hanya bisa akses miliknya
      if (req.user?.role === 'TRAVELLER' && req.user.id !== booking.user.id) {
        return res.status(403).json({ message: 'Access denied' });
      }

      return res.json(booking);
    } catch (err) {
      return res
        .status(500)
        .json({ message: 'Failed to fetch booking', error: err });
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

  public async findMyBookings(req: Request, res: Response) {
    try {
      // const userId = 'user-5-uuid'; // semerntara hardcode user ID
      const userId = req.user?.id;
      if (!userId) {
        return res.status(401).json({ message: 'Unauthorized' });
      }

      const bookings = await service.findBookingsByUserId(userId);
      return res.json(bookings);
    } catch (err) {
      return res
        .status(500)
        .json({ message: 'Failed to fetch user bookings', error: err });
    }
  }

  public async approveBooking(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updated = await service.updateBookingStatus(id, {
        status: 'CONFIRMED',
      });
      return res.json({
        message: 'Booking approved',
        data: updated,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ message: 'Failed to approve booking', error: err });
    }
  }

  public async rejectBooking(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const updated = await service.updateBookingStatus(id, {
        status: 'CANCELLED',
      });
      return res.json({
        message: 'Booking rejected',
        data: updated,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ message: 'Failed to reject booking', error: err });
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
