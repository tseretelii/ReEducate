import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class NoBrowserEditMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const method = req.method.toUpperCase();
    const isMutation = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method);
    const userAgent = req.get('user-agent') || '';

    if (isMutation && userAgent.toLowerCase().includes('mozilla')) {
      throw new ForbiddenException('Browser edits are not allowed. Use API clients.');
    }

    next();
  }
}

