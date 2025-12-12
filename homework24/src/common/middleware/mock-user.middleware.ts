import { Injectable, NestMiddleware } from '@nestjs/common';
import { Role } from '../enums/role.enum';

@Injectable()
export class MockUserMiddleware implements NestMiddleware {
  use(req: any, _: any, next: () => void) {
    const headerRoles = req.headers['x-roles'];
    const roles = Array.isArray(headerRoles)
      ? headerRoles
      : headerRoles
          ?.toString()
          .split(',')
          .map((role: string) => role.trim().toLowerCase())
          .filter(Boolean);

    req.user = {
      roles: roles?.length ? roles : [Role.Viewer],
    };

    next();
  }
}

