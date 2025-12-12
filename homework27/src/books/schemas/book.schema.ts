import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument, Types } from 'mongoose';
import { Author } from '../../authors/schemas/author.schema';

export type BookDocument = HydratedDocument<Book>;

@Schema({ timestamps: true })
export class Book {
  @Prop({ required: true, trim: true })
  title: string;

  @Prop({ type: Types.ObjectId, ref: Author.name, required: true })
  author: Types.ObjectId;

  @Prop()
  description?: string;

  @Prop({ default: false })
  published?: boolean;
}

export const BookSchema = SchemaFactory.createForClass(Book);

