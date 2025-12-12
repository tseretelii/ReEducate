import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ParseObjectIdPipe } from '../common/pipes/parse-object-id.pipe';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author } from './schemas/author.schema';

@Controller('authors')
export class AuthorsController {
  constructor(private readonly authorsService: AuthorsService) {}

  @Post()
  async create(@Body() createAuthorDto: CreateAuthorDto): Promise<Author> {
    return this.authorsService.create(createAuthorDto);
  }

  @Get()
  async findAll(): Promise<Author[]> {
    return this.authorsService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<Author | null> {
    return this.authorsService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseObjectIdPipe) id: string,
    @Body() updateAuthorDto: UpdateAuthorDto,
  ): Promise<Author | null> {
    return this.authorsService.update(id, updateAuthorDto);
  }

  @Delete(':id')
  async remove(
    @Param('id', ParseObjectIdPipe) id: string,
  ): Promise<Author | null> {
    return this.authorsService.remove(id);
  }
}

