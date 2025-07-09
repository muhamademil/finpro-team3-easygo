// src/controllers/room.controller.ts
import { Request, Response, NextFunction } from 'express';
import { RoomService } from '../services/room.service';

export class RoomController {
  private service = new RoomService();

  public async createRoom(req: Request, res: Response): Promise<void> {
    try {
      const room = await this.service.createRoom(req.body);
      res.status(201).json(room);
    } catch (error) {
      console.error('Create Room Error:', error);
      res.status(500).json({ message: 'Failed to create room', error });
    }
  }

  public async findAllRooms(req: Request, res: Response): Promise<void> {
    try {
      const rooms = await this.service.findAllRooms();
      res.status(200).json(rooms);
    } catch (error) {
      console.error('Find All Rooms Error:', error);
      res.status(500).json({ message: 'Failed to fetch rooms', error });
    }
  }

  public async findRoomById(req: Request, res: Response): Promise<void> {
  console.log('Room ID requested:', req.params.id);

  try {
    const room = await this.service.findRoomById(req.params.id);
    if (!room) {
      res.status(404).json({ message: 'Room not found' });
      return;
    }
    res.status(200).json({ data: room });
  } catch (error) {
    console.error('Find Room Error:', error);
    res.status(500).json({ message: 'Failed to fetch room', error });
  }
}


  public async updateRoom(req: Request, res: Response): Promise<void> {
    try {
      const room = await this.service.updateRoom(req.params.id, req.body);
      res.status(200).json(room);
    } catch (error) {
      console.error('Update Room Error:', error);
      res.status(500).json({ message: 'Failed to update room', error });
    }
  }

  public async deleteRoom(req: Request, res: Response): Promise<void> {
    try {
      await this.service.deleteRoom(req.params.id);
      res.status(204).send();
    } catch (error) {
      console.error('Delete Room Error:', error);
      res.status(500).json({ message: 'Failed to delete room', error });
    }
  }

  public getAvailability = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { roomId } = req.params;
      const { month, year } = req.query;

      if (!month || !year) {
        return res
          .status(400)
          .json({ message: 'Parameter month dan year diperlukan.' });
      }

      const result = await this.service.getRoomAvailability(
        roomId,
        Number(month),
        Number(year),
      );

      res.status(200).json({
        message: 'Ketersediaan kamar berhasil diambil',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  public updateAvailability = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { roomId } = req.params;
      const { date, isAvailable } = req.body;

      if (!date || typeof isAvailable !== 'boolean') {
        return res.status(400).json({
          message: 'Parameter date dan isAvailable diperlukan.',
        });
      }

      const result = await this.service.updateRoomAvailability(
        roomId,
        date,
        isAvailable,
      );

      res.status(200).json({
        message: 'Ketersediaan kamar berhasil diupdate',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  public updatePeakPrice = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { roomId } = req.params;
      const { date, type, amount } = req.body;

      if (!date || !type || !amount) {
        return res.status(400).json({
          message: 'Parameter date, type, dan amount diperlukan.',
        });
      }

      const result = await this.service.updatePeakPrice(
        roomId,
        date,
        type,
        amount,
      );

      res.status(200).json({
        message: 'Harga puncak berhasil diupdate',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  public deletePeakPrice = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { roomId } = req.params;
      const { date } = req.body;

      if (!date) {
        return res.status(400).json({
          message: 'Parameter date diperlukan.',
        });
      }

      await this.service.deletePeakPrice(roomId, date);

      res.status(200).json({
        message: 'Harga puncak berhasil dihapus',
      });
    } catch (error) {
      next(error);
    }
  };
  public getRoomsByProperty = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { propertyId } = req.params;

      const rooms = await this.service.getRoomsByProperty(propertyId);

      res.status(200).json({
        message: 'Kamar berhasil diambil',
        data: rooms,
      });
    } catch (error) {
      next(error);
    }
  };
}
