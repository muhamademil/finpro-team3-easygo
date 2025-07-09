import { PropertyService } from '../services/property.service';
import { Request, Response, NextFunction } from 'express';
import {
  CreatePropertyInput,
  UpdatePropertyInput,
} from '../models/property.model';

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

  public getPropertyById = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params; // Ambil ID dari parameter URL
      const result = await this.propertyService.getPropertyById(id);
      res.status(200).json({
        message: 'Detail properti berhasil diambil',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  public updateProperty = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { id } = req.params;
      const userId = req.user!.id; // Ambil dari middleware
      const propertyData: UpdatePropertyInput = req.body;

      const result = await this.propertyService.updateProperty(
        userId,
        id,
        propertyData,
      );

      res.status(200).json({
        message: 'Properti berhasil diperbarui',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}
