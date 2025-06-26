import { PropertyService } from '@/services/property.service';
import { Request, Response, NextFunction } from 'express';

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
}
