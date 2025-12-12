import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class ExpressLoaderMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    // Illustrative middleware: attaches a flag to the request.
    (req as Request & { injected?: boolean }).injected = true;
    next();
  }
}

