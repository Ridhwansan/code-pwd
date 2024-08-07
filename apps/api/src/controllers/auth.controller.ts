import { loginService } from '@/services/auth/login.service';
import { registerService } from '@/services/auth/register.service';
import { NextFunction, Request, Response } from 'express';

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
}



console.log('Hello');
