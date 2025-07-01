// src/controllers/booking.controller.ts
import { Request, Response } from 'express';
import { BookingService } from '@/services/booking.service';

export class BookingController {
  private bookingService = new BookingService();

  public async create(req: Request, res: Response) {
    try {
      const result = await this.bookingService.create(req.body);
      res.status(201).json(result);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  public async findAllByUser(req: Request, res: Response) {
    try {
      const userId = Number(req.params.userId);
      const result = await this.bookingService.findAllByUser(userId);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  public async findById(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const result = await this.bookingService.findById(id);
      res.json(result);
    } catch (err: any) {
      res.status(404).json({ message: 'Booking not found' });
    }
  }

  public async update(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const result = await this.bookingService.update(id, req.body);
      res.json(result);
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }

  public async updatePaymentStatus(req: Request, res: Response) {
  try {
    const id = Number(req.params.id);
    const { paymentProofUrl } = req.body;

    // Dummy user (nanti ganti ke req.user)
    const currentUser = {
      id: 1,
      role: 'USER',
    };

    // Hanya USER yang boleh ubah status ini
    if (currentUser.role !== 'USER') {
      return res.status(403).json({ message: 'Forbidden' });
    }

    const updated = await this.bookingService.update(id, {
      paymentProofUrl,
      status: 'MENUNGGU_KONFIRMASI'
    });

    res.json(updated);
  } catch (err: any) {
    res.status(500).json({ message: err.message });
  }
}

  public async delete(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      await this.bookingService.delete(id);
      res.status(204).end();
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
  }
}
