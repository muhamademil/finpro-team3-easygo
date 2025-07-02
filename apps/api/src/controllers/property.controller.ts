import { PropertyService } from '@/services/property.service';
import { Request, Response, NextFunction } from 'express';
import { CreatePropertyInput } from '@/models/property.model';

export class PropertyController {
  private propertyService: PropertyService = new PropertyService();

  public getProperties = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const result = await this.propertyService.getProperties(req.query);
      res.status(200).json({
        message: 'Property fetched successfully',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  public createProperty = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      // req.user.id akan tersedia karena authMiddleware
      const userId = req.user!.id;
      const propertyData: CreatePropertyInput = req.body;

      const result = await this.propertyService.createProperty(
        userId,
        propertyData,
      );

      res.status(201).json({
        message: 'Properti baru berhasil dibuat!',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}
