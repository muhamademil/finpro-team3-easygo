import { Router } from 'express';
import { AuthController } from '@/controllers/auth.controller';

export class AuthRouter {
  private router: Router;
  private authController: AuthController;

  constructor() {
    this.authController = new AuthController();
    this.router = Router();
    this.Routes();
  }

  private Routes(): void {
    this.router.post(
      '/register/initiate',
      this.authController.initiateRegistration,
    );
    this.router.post(
      '/register/complete',
      this.authController.completeRegistration,
    );
    this.router.post('/login', this.authController.login);
    this.router.post('/forgot-password', this.authController.forgotPassword);
    this.router.post('/reset-password', this.authController.resetPassword);

    this.router.post('/google/login', this.authController.googleLogin);
  }

  getRouter(): Router {
    return this.router;
  }
}
