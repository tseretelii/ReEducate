import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

interface ProductQuery {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  page: number;
  limit: number;
}

@Injectable()
export class ProductsService {
  private products: Product[] = [
    { id: 1, name: 'milk', description: 'Organic whole milk', price: 300 },
    { id: 2, name: 'bread', description: 'Sourdough bread', price: 400 },
    { id: 3, name: 'cheese', description: 'Aged cheddar', price: 550 },
  ];

  create(dto: CreateProductDto): Product {
    const id = this.products.length ? this.products[this.products.length - 1].id + 1 : 1;
    const product: Product = { id, ...dto };
    this.products.push(product);
    return product;
  }

  findAll(query: ProductQuery) {
    const filtered = this.products.filter((product) => {
      if (query.id !== undefined && product.id !== query.id) {
        return false;
      }
      if (query.price !== undefined && product.price !== query.price) {
        return false;
      }
      if (query.name && !product.name.toLowerCase().includes(query.name.toLowerCase())) {
        return false;
      }
      if (
        query.description &&
        !product.description.toLowerCase().includes(query.description.toLowerCase())
      ) {
        return false;
      }
      return true;
    });

    const start = (query.page - 1) * query.limit;
    const end = start + query.limit;
    const items = filtered.slice(start, end);

    return {
      meta: {
        total: filtered.length,
        page: query.page,
        limit: query.limit,
      },
      items,
    };
  }

  findOne(id: number): Product {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  update(id: number, dto: UpdateProductDto): Product {
    const product = this.findOne(id);
    Object.assign(product, dto);
    return product;
  }

  remove(id: number): Product {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    const [removed] = this.products.splice(index, 1);
    return removed;
  }
}

