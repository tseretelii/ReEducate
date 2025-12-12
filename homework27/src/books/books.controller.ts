import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ParseObjectIdPipe } from '../common/pipes/parse-object-id.pipe';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { FindBooksQueryDto } from './dto/find-books.query';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './schemas/book.schema';

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Post()
  async create(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return this.booksService.create(createBookDto);
  }

  @Get()
  async findAll(@Query() query: FindBooksQueryDto): Promise<Book[]> {
    return this.booksService.findAll(query);
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<Book | null> {
    return this.booksService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateBookDto: UpdateBookDto,
  ): Promise<Book | null> {
    return this.booksService.update(id, updateBookDto);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<Book | null> {
    return this.booksService.remove(id);
  }
}

