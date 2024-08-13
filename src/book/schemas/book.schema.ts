import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { User } from 'src/auth/schema/user.schema';

export enum Category {
  ADVENTURE = 'adventure',
  CLASSICS = 'classics',
  CRIME = 'crime',
  FANTASY = 'fantasy',
}

@Schema({
  timestamps: true,
})
export class Book {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  author: string;
  @Prop()
  price: number;

  @Prop()
  Category: Category;
  @Prop({ type: mongoose.Types.ObjectId, ref: 'User' })
  user: User;
}

export const BookSchema = SchemaFactory.createForClass(Book);
