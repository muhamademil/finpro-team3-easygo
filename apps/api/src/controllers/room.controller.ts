// src/controllers/room.controller.ts
import { Request, Response } from 'express';
import { RoomService } from '@/services/room.service';

export class RoomController {
  private service = new RoomService();

  public async findById(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const room = await this.service.findById(id);
    res.json(room);
  }

  public async getAvailability(req: Request, res: Response): Promise<void> {
    const id = Number(req.params.id);
    const { startDate, endDate } = req.query;

    const availabilities = await this.service.getAvailability(
      id,
      startDate as string,
      endDate as string
    );

    res.json(availabilities);
  }
}
