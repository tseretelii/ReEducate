import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FilterProductDto } from './dto/filter-product.dto';
import { randomUUID } from 'crypto';

@Injectable()
export class ProductsService {
  private products: Product[] = [];

  create(dto: CreateProductDto): Product {
    const product: Product = {
      id: randomUUID(),
      ...dto,
    };
    this.products.push(product);
    return product;
  }

  findAll(filter?: FilterProductDto): Product[] {
    if (!filter) {
      return this.products;
    }

    return this.products.filter((product) => {
      return (
        (filter.id ? product.id === filter.id : true) &&
        (filter.name ? product.name.toLowerCase().includes(filter.name.toLowerCase()) : true) &&
        (filter.price !== undefined ? product.price === filter.price : true)
      );
    });
  }

  findOne(id: string): Product {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  update(id: string, dto: UpdateProductDto): Product {
    const product = this.findOne(id);
    const updated: Product = { ...product, ...dto };
    this.products = this.products.map((item) => (item.id === id ? updated : item));
    return updated;
  }

  remove(id: string): void {
    this.findOne(id); // will throw if missing
    this.products = this.products.filter((item) => item.id !== id);
  }
}

