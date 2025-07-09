import { Router } from 'express';
import { TenantController } from '@/controllers/tenant.controller';
import { authMiddleware } from '@/middleware/auth.middleware';
import { tenantMiddleware } from '@/middleware/tenant.middleware';

export class TenantRouter {
  private router: Router;
  private tenantController: TenantController;

  constructor() {
    this.tenantController = new TenantController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Endpoint ini akan dapat diakses di GET /api/tenant/properties
    // dan dilindungi oleh DUA middleware
    this.router.get(
      '/properties',
      authMiddleware,
      tenantMiddleware,
      this.tenantController.getMyProperties,
    );
  }

  getRouter(): Router {
    return this.router;
  }
}
