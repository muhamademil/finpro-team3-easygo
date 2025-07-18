import { Router } from 'express';
import { RoomController } from '@/controllers/room.controller';

export class RoomRouter {
  private router = Router();
  private controller = new RoomController();

  constructor() {
    this.setRoutes();
  }

  private setRoutes(): void {
    this.router.post(
      '/',
      this.controller.createRoom.bind(this.controller),
    );
    this.router.get(
      '/',
      this.controller.findAllRooms.bind(this.controller),
    );
    this.router.get(
      '/:id',
      this.controller.findRoomById.bind(this.controller),
    );
    this.router.put(
      '/:id',
      this.controller.updateRoom.bind(this.controller),
    );
    this.router.delete(
      '/:id',
      this.controller.deleteRoom.bind(this.controller),
    );
    this.router.get('/:roomId/availability', this.controller.getAvailability);
    // Availability endpoints
    this.router.get('/:roomId/availability', this.controller.getAvailability);
    this.router.put(
      '/:roomId/availability',
      this.controller.updateAvailability,
    );

    // Peak price endpoints
    this.router.put('/:roomId/peak-price', this.controller.updatePeakPrice);
    this.router.delete('/:roomId/peak-price', this.controller.deletePeakPrice);

    // Get rooms by property
    this.router.get(
      '/property/:propertyId/rooms',
      this.controller.getRoomsByProperty,
    );
  }

  public getRouter(): Router {
    return this.router;
  }
}
