import { Request, Response, NextFunction } from 'express';
import { TenantService } from '@/services/tenant.service';

export class TenantController {
  private tenantService: TenantService = new TenantService();

  public getMyProperties = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      // get userId dari req.user yang sudah ditempel oleh authMiddleware
      const userId = req.user!.id;

      const result = await this.tenantService.getPropertiesByTenant(userId);

      res.status(200).json({
        message: 'Properti tenant berhasil diambil',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };
}
