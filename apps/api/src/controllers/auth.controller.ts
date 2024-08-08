import { loginService } from '@/services/auth/login.service';
import { registerService } from '@/services/auth/register.service';
import { forgotPassword } from '@/services/auth/forgot-password.service';
import { NextFunction, Request, Response } from 'express';
import { resetPasswordService } from '@/services/auth/reset-password.service';

//controller ini untuk menangani HTTP request dari client dan mereturnnya

export class AuthController {
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await registerService(req.body);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async login(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await loginService(req.body);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async forgotPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await forgotPassword(req.body.email);
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }

  async resetPassword(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await resetPasswordService(
        //res.locals.user.id adalah tempat untuk naro isi token
        Number(res.locals.user.id),
        req.body.password,
      );
      return res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}

console.log('Hello');
