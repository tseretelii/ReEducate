import { Module } from '@nestjs/common';
import { WishlistModule } from './wishlist/wishlist.module';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [WishlistModule, ProductsModule],
})
export class AppModule {}

