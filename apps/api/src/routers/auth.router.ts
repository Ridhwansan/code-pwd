import { AuthController } from '@/controllers/auth.controller';
import { verifyToken } from '@/lib/verifyToken';
import { Router } from 'express';

export class AuthRouter {
  private router: Router;
  private authController: AuthController;

  constructor() {
    this.authController = new AuthController();
    this.router = Router();
    this.initializeRoutes();
  }

  private initializeRoutes(): void {
    this.router.post('/register', this.authController.register);
    this.router.post('/login', this.authController.login);
    this.router.post('/forgot-password', this.authController.forgotPassword);
    this.router.patch(
      '/reset-password',
      verifyToken,
      this.authController.resetPassword,
    ); //kalo gapake verifyToken, nanti res.locals.id gabisa jalan
  }

  getRouter(): Router {
    return this.router;
  }
}

//urutannya
// 1. Service
// 2. Controller
// 3. router
// 4. App / index
