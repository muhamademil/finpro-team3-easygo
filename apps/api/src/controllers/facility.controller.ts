import { Request, Response, NextFunction } from 'express';
import { FacilityService } from '../services/facility.service';

export class FacilityController {
  private facilityService: FacilityService = new FacilityService();

  public getFacilities = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result = await this.facilityService.getAllFacilities();

      res.status(200).json({
        message: 'Fasilitas berhasil diambil',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}
