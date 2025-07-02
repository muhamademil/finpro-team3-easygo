import { Request, Response, NextFunction } from 'express';
import { UploadService } from '../services/upload.service';

export class UploadController {
  private uploadService: UploadService = new UploadService();

  public getSignature = (req: Request, res: Response, next: NextFunction) => {
    try {
      const signatureData = this.uploadService.getUploadSignature();

      res.status(200).json({
        message: 'Signature generated successfully',
        data: signatureData,
      });
    } catch (error) {
      next(error);
    }
  };
}
