import { Router } from 'express';
import { UploadController } from '../controllers/upload.controller';
import { tenantMiddleware } from '@/middleware/tenant.middleware';

export class UploadRouter {
  private router: Router;
  private uploadController: UploadController;

  constructor() {
    this.uploadController = new UploadController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Endpoint ini akan dapat diakses di GET /api/uploads/signature
    // dan dilindungi oleh authMiddleware.
    this.router.get('/signature', this.uploadController.getSignature);
  }

  getRouter(): Router {
    return this.router;
  }
}
