import { Router } from 'express';
import { PropertyController } from '@/controllers/property.controller';

export class PropertyRouter {
  private router: Router;
  private propertyController: PropertyController;

  constructor() {
    this.propertyController = new PropertyController();
    this.router = Router();
    this.initializeRoutes();
  }
  private initializeRoutes(): void {
    this.router.get('/', this.propertyController.getProperties);
  }

  getRouter(): Router {
    return this.router;
  }
}
