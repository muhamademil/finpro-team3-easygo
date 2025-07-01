// src/routers/room.router.ts
import { Router } from 'express';
import { RoomController } from '@/controllers/room.controller';

export class RoomRouter {
  private router = Router();
  private controller = new RoomController();

  constructor() {
    this.setRoutes();
  }

  private setRoutes(): void {
    this.router.get('/room/:id', this.controller.findById.bind(this.controller));
    this.router.get('/room/:id/availability', this.controller.getAvailability.bind(this.controller));
  }

  public getRouter(): Router {
    return this.router;
  }
}
