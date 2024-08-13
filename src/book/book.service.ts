import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import mongoose from 'mongoose';
import { Query } from 'express-serve-static-core';
@Injectable()
export class BookService {
  [x: string]: any;
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(query: Query): Promise<Book[]> {
    const resPerPage = 2;
    const currentPage = Number(query.page) || 1;
    const skip = resPerPage * (currentPage - 1);

    const keyWord = query.keyWord
      ? {
          title: {
            $regex: query.keyWord,
            $options: '',
          },
        }
      : {};

    const books = await this.bookModel
      .find({ ...keyWord })
      .limit(resPerPage)
      .skip(skip);

    return books;
  }
  async create(book: Book): Promise<Book> {
    const res = await this.bookModel.create(book);

    return res;
  }
  async findById(id: string): Promise<Book> {
    const validId = mongoose.isValidObjectId(id);

    if (!validId) {
      throw new BadRequestException('Enter correct Book');
    }
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
