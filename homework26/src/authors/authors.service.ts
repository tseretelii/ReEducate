import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import { Author, AuthorDocument } from './schemas/author.schema';

@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel(Author.name) private readonly authorModel: Model<AuthorDocument>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto): Promise<Author> {
    const created = new this.authorModel(createAuthorDto);
    return created.save();
  }

  async findAll(): Promise<Author[]> {
    return this.authorModel.find().lean().exec();
  }

  async findOne(id: string): Promise<Author | null> {
    const author = await this.authorModel.findById(id).lean().exec();
    if (!author) {
      throw new NotFoundException('Author not found');
    }
    return author;
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto): Promise<Author | null> {
    const updated = await this.authorModel
      .findByIdAndUpdate(id, updateAuthorDto, { new: true, lean: true })
      .exec();
    if (!updated) {
      throw new NotFoundException('Author not found');
    }
    return updated;
  }

  async remove(id: string): Promise<Author | null> {
    const deleted = await this.authorModel.findByIdAndDelete(id).lean().exec();
    if (!deleted) {
      throw new NotFoundException('Author not found');
    }
    return deleted;
  }
}

