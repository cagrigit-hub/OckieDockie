import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { RateLimiterMemory } from 'rate-limiter-flexible';

@Injectable()
export class RateLimitMiddleware implements NestMiddleware {
  private rateLimiter = new RateLimiterMemory({
    points: 10, // Number of points
    duration: 1, // Per second
  });

  async use(req: Request, res: Response, next: () => void) {
    try {
      const key = req.ip; // Use the IP address as the rate limiter key
      const rateLimiterRes = await this.rateLimiter.consume(key);
      res.setHeader('X-Rate-Limit-Limit', rateLimiterRes.remainingPoints);
      res.setHeader('X-Rate-Limit-Remaining', rateLimiterRes.remainingPoints);
      res.setHeader('X-Rate-Limit-Reset', rateLimiterRes.msBeforeNext);
      next();
    } catch (err) {
      res.status(429).send('Too Many Requests');
    }
  }
}
