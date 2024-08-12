import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import mongoose from 'mongoose';

@Injectable()
export class BookService {
  [x: string]: any;
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    const books = await this.bookModel.find();
    return books;
  }
  async create(book: Book): Promise<Book> {
    const res = await this.bookModel.create(book);

    return res;
  }
  async findById(id: string): Promise<Book> {
    const res = await this.bookModel.findById(id);

    if (!res) {
      throw new NotFoundException('book not found!');
    }
    return res;
  }
  async UpdateOneById(id: string, book: Book): Promise<Book> {
    return await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });
  }
  async UpdateAllById(id: string, book: Book): Promise<Book> {
    return await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });
  }
  async DeleteById(id: string): Promise<Book> {
    return await this.bookModel.findByIdAndDelete(id);
  }
}
