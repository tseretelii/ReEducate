import { Module, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { ProductsModule } from './products/products.module';
import { NoBrowserEditMiddleware } from './middleware/no-browser-edit.middleware';
import { RoleMiddleware } from './middleware/role.middleware';

@Module({
  imports: [ProductsModule],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(NoBrowserEditMiddleware, RoleMiddleware)
      .forRoutes({ path: 'products', method: RequestMethod.ALL });
  }
}

