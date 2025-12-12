import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from '../books/schemas/book.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Book.name) private readonly bookModel: Model<BookDocument>,
  ) {}

  private async ensureBooksExist(bookIds?: string[]): Promise<void> {
    if (!bookIds?.length) {
      return;
    }
    const found = await this.bookModel.countDocuments({ _id: { $in: bookIds } });
    if (found !== bookIds.length) {
      throw new NotFoundException('One or more books were not found');
    }
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    await this.ensureBooksExist(createUserDto.books);
    const created = new this.userModel(createUserDto);
    return created.save();
  }

  async findAll(): Promise<User[]> {
    return this.userModel
      .find()
      .populate({ path: 'books', select: 'title author' })
      .lean()
      .exec();
  }

  async findOne(id: string): Promise<User | null> {
    const user = await this.userModel
      .findById(id)
      .populate({ path: 'books', select: 'title author' })
      .lean()
      .exec();
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User | null> {
    await this.ensureBooksExist(updateUserDto.books);
    const updated = await this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true, lean: true })
      .populate({ path: 'books', select: 'title author' })
      .exec();
    if (!updated) {
      throw new NotFoundException('User not found');
    }
    return updated;
  }

  async remove(id: string): Promise<User | null> {
    const deleted = await this.userModel.findByIdAndDelete(id).lean().exec();
    if (!deleted) {
      throw new NotFoundException('User not found');
    }
    return deleted;
  }
}


