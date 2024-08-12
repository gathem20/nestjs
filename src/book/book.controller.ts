import { Controller, Get, Post, Body, Param, Patch, Put, Delete } from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book-dto';
import { UpdateBookDto } from './dto/update-book-book';

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}
  @Get()
  async getAllBook(): Promise<Book[]> {
    return this.bookService.findAll();
  }
  @Get(':id')
  async getBook(
    @Param('id')
    id: string,
  ): Promise<Book> {
    return this.bookService.findById(id);
  }
  @Post('new')
  async createBook(
    @Body()
    book: CreateBookDto,
  ): Promise<Book> {
    return this.bookService.create(book);
  }

  @Patch(':id')
  async updateBook(
    @Param('id') 
    id:string,
    @Body()
    book:UpdateBookDto
  ):Promise <Book>{
    return this.bookService.UpdateOneById(id , book)
  }


  @Put(':id')
  async UpdateAllBook(
    @Param('id')
    id:string,
    @Body()
    book:UpdateBookDto
  ):Promise <Book>{
    return this.bookService.UpdateAllById(id, book);
  }
  @Delete(':id')
  async DeleteBook(
    @Param('id')
    id:string
  ):Promise <Book>{
    return this.bookService.DeleteById(id);
  }

}
