import { AuthService } from '@/services/auth.service';
import { Request, Response, NextFunction } from 'express';
import { ResponseError } from '@/error/response.error';

export class AuthController {
  private authService: AuthService = new AuthService();

  public initiateRegistration = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { email, role } = req.body;

      const result = await this.authService.initiateRegistration({
        email,
        role,
      });

      res.status(200).json({
        message:
          'Pendaftaran awal berhasil. Silakan cek email untuk melengkapi profil Anda.',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  public completeRegistration = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const {
        token,
        name,
        password,
        phone,
        photo_url,
        city,
        bank_account,
        bank_account_name,
      } = req.body;
      const result = await this.authService.completeRegistration({
        token,
        name,
        password,
        phone,
        photo_url,
        city,
        bank_account,
        bank_account_name,
      });

      res.status(201).json({
        message: 'Pendaftaran berhasil diselesaikan. Silakan masuk.',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  public login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { email, password } = req.body;
      const result = await this.authService.login({
        email,
        password,
      });

      res.status(200).json({
        message: 'Login berhasil',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  public googleLogin = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { accessToken } = req.body;
      if (!accessToken) {
        throw new ResponseError(400, 'Google access token tidak tersedia.');
      }
      const result = await this.authService.googleLogin(accessToken);
      res.status(200).json({
        message: 'Login dengan Google berhasil.',
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  public forgotPassword = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { email } = req.body;
      const result = await this.authService.forgotPassword({
        email,
      });

      res.status(200).json({
        message: 'Link reset Password berhasil dikirim',
        data: { result },
      });
    } catch (error) {
      next(error);
    }
  };

  public resetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    try {
      const { token, newPassword } = req.body;
      await this.authService.resetPassword({
        token,
        newPassword,
      });

      res.status(200).json({
        message: 'Password kamu berhasil di ubah. Silakan login kembali.',
      });
    } catch (error) {
      next(error);
    }
  };
}
