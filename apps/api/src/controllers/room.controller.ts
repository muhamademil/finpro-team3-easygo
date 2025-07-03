// src/controllers/room.controller.ts
import { Request, Response } from 'express';
import { RoomService } from '@/services/room.service';

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
      res.status(200).json(room);
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
}
