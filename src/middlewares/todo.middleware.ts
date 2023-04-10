import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { TodoRequest} from '../todoRequest';
import * as jwt from 'jsonwebtoken';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class TodoMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) {}
    async  use(req: TodoRequest, res: Response, next: NextFunction) {
    const authHeader = req.headers['auth-user'];
    if (!authHeader) {
      return res.status(401).json({ message: 'Authorization header manquant' });
    }
    const token = req.headers['auth-user'];
    if (!token) {
      return res.status(401).json({ message: 'Token manquant' });
    }

    try {
      const decodedToken = await this.jwtService.verifyAsync(token);
      if (!decodedToken.userId) {
        return res.status(401).json({ message: 'User ID manquant' });
      }
      req.userId = decodedToken.userId;
      next();
    } catch (err) {
      return res.status(401).json({ message: 'Token invalide' });
    }
  }
}






