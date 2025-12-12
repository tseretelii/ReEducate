import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  private products: Product[] = [
    {
      id: 1,
      title: 'Wireless Keyboard',
      description: 'Slim Bluetooth keyboard for laptops',
      price: 89.9,
      stock: 12,
      category: 'electronics',
    },
  ];

  findAll(): Product[] {
    return this.products;
  }

  findOne(id: number): Product {
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  create(dto: CreateProductDto): Product {
    const nextId = this.products.length
      ? Math.max(...this.products.map((p) => p.id)) + 1
      : 1;
    const newProduct: Product = { id: nextId, ...dto };
    this.products.push(newProduct);
    return newProduct;
  }

  update(id: number, dto: UpdateProductDto): Product {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    this.products[index] = { ...this.products[index], ...dto };
    return this.products[index];
  }

  remove(id: number): void {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    this.products.splice(index, 1);
  }
}

