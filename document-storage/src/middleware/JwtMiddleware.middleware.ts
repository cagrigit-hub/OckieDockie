import { jwtConstants } from './../document/constants';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';

declare global {
  namespace Express {
    interface Request {
      userId?: number;
    }
  }
}

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.slice(7, authHeader.length);
      try {
        const decoded = jwt.verify(token, jwtConstants.secret);
        req.userId = parseInt(decoded.sub as string); // Set the user ID in the request
      } catch (err) {
        // Handle errors
        console.log(err);
      }
    }
    next();
  }
}
