import { Router } from 'express';
import { FacilityController } from '../controllers/facility.controller';

export class FacilityRouter {
  private router: Router;
  private facilityController: FacilityController;

  constructor() {
    this.facilityController = new FacilityController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    // Endpoint ini akan dapat diakses di GET /api/facilities/
    this.router.get('/', this.facilityController.getFacilities);
  }

  getRouter(): Router {
    return this.router;
  }
}
