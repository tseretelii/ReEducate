import { Injectable, NestMiddleware, ForbiddenException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class RoleMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const method = req.method.toUpperCase();
    const isProtected = ['POST', 'PUT', 'PATCH', 'DELETE'].includes(method);
    const roleHeader = req.get('x-role') || '';
    const isAdmin = roleHeader.toLowerCase() === 'admin';

    if (isProtected && !isAdmin) {
      throw new ForbiddenException('Admin role required for this operation.');
    }

    next();
  }
}

