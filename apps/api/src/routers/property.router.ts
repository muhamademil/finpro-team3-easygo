import { Router } from 'express';
import { PropertyController } from '@/controllers/property.controller';
import { authMiddleware } from '@/middleware/auth.middleware';
import { tenantMiddleware } from '@/middleware/tenant.middleware';

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
    this.router.get('/:id', this.propertyController.getPropertyById);
    this.router.post(
      '/',
      authMiddleware,
      tenantMiddleware,
      this.propertyController.createProperty,
    );
    this.router.put(
      '/:id',
      authMiddleware,
      tenantMiddleware,
      this.propertyController.updateProperty,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
