import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { Item } from './entities/item.entity';

@Injectable()
export class ItemsService {
  private items: Item[] = [];
  private idCounter = 1;

  create(dto: CreateItemDto): Item {
    const newItem: Item = {
      id: this.idCounter++,
      ...dto
    };
    this.items.push(newItem);
    return newItem;
  }

  findAll(): Item[] {
    return this.items;
  }

  findOne(id: number): Item {
    const item = this.items.find((entry) => entry.id === id);
    if (!item) {
      throw new NotFoundException(`Item ${id} not found`);
    }
    return item;
  }

  update(id: number, dto: UpdateItemDto): Item {
    const existing = this.findOne(id);
    const updated: Item = { ...existing, ...dto };
    this.items = this.items.map((item) => (item.id === id ? updated : item));
    return updated;
  }

  remove(id: number): void {
    const beforeLength = this.items.length;
    this.items = this.items.filter((item) => item.id !== id);
    if (this.items.length === beforeLength) {
      throw new NotFoundException(`Item ${id} not found`);
    }
  }
}

