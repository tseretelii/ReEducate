import { Injectable, NotFoundException } from '@nestjs/common';

type LanguageCode = 'ge' | 'ru' | 'en' | 'ger' | 'fr' | 'it';

@Injectable()
export class WishlistService {
  private readonly wishes: Record<LanguageCode, string[]> = {
    ge: ['მეგობრობა', 'განვითარება', 'მოგზაურობა'],
    ru: ['дружба', 'развитие', 'путешествия'],
    en: ['friendship', 'growth', 'travel'],
    ger: ['freundschaft', 'wachstum', 'reisen'],
    fr: ['amitié', 'croissance', 'voyage'],
    it: ['amicizia', 'crescita', 'viaggio'],
  };

  getWishlist(lang: LanguageCode): string[] {
    const list = this.wishes[lang];
    if (!list) {
      throw new NotFoundException(`Language "${lang}" is not supported.`);
    }
    return list;
  }
}

