import {
  Controller,
  DefaultValuePipe,
  Get,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { WishlistService } from './wishlist.service';

@Controller('wishlist')
export class WishlistController {
  constructor(private readonly wishlistService: WishlistService) {}

  @Get()
  @UsePipes(new ValidationPipe({ transform: true }))
  getWishlist(
    @Query('lang', new DefaultValuePipe('en')) lang: 'ge' | 'ru' | 'en' | 'ger' | 'fr' | 'it',
  ) {
    return this.wishlistService.getWishlist(lang);
  }
}

