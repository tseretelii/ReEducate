import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Book } from '../../books/schemas/book.schema';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  email: string;

  @Prop({ type: [{ type: Types.ObjectId, ref: Book.name }], default: [] })
  books: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);


