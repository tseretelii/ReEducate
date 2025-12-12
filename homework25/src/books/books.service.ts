import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book, BookDocument } from './schemas/book.schema';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
  ) {}

  async create(createBookDto: CreateBookDto): Promise<Book> {
    const created = new this.bookModel(createBookDto);
    return created.save();
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().lean().exec();
  }

  async findOne(id: string): Promise<Book | null> {
    const book = await this.bookModel.findById(id).lean().exec();
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book | null> {
    const updated = await this.bookModel
      .findByIdAndUpdate(id, updateBookDto, { new: true, lean: true })
      .exec();
    if (!updated) {
      throw new NotFoundException('Book not found');
    }
    return updated;
  }

  async remove(id: string): Promise<Book | null> {
    const deleted = await this.bookModel.findByIdAndDelete(id).lean().exec();
    if (!deleted) {
      throw new NotFoundException('Book not found');
    }
    return deleted;
  }
}

