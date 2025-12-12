import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book, BookDocument } from './schemas/book.schema';
import { Author, AuthorDocument } from '../authors/schemas/author.schema';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
    @InjectModel(Author.name) private readonly authorModel: Model<AuthorDocument>,
  ) {}

  private async ensureAuthorExists(authorId: string): Promise<void> {
    const exists = await this.authorModel.exists({ _id: authorId }).lean();
    if (!exists) {
      throw new NotFoundException('Author not found');
    }
  }

  async create(createBookDto: CreateBookDto): Promise<Book> {
    await this.ensureAuthorExists(createBookDto.author);
    const created = new this.bookModel(createBookDto);
    return created.save();
  }

  async findAll(): Promise<Book[]> {
    return this.bookModel.find().populate('author').lean().exec();
  }

  async findOne(id: string): Promise<Book | null> {
    const book = await this.bookModel.findById(id).populate('author').lean().exec();
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto): Promise<Book | null> {
    if (updateBookDto.author) {
      await this.ensureAuthorExists(updateBookDto.author);
    }
    const updated = await this.bookModel
      .findByIdAndUpdate(id, updateBookDto, { new: true, lean: true })
      .populate('author')
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

