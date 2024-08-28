import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { createBookDto } from './dto/create-book.dto';
import { updateBookDto } from './dto/update-book.dto';
import {Query as ExpressQuery} from 'express-serve-static-core'

@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}

  @Get()
  async getAllBooks(@Query() query :ExpressQuery): Promise<Book[]> {
    return this.bookService.findAll(query);
  }

  @Post()
  async createBook(
    @Body()
    book: createBookDto,
  ): Promise<Book> {
    return await this.bookService.create(book);
  }

  @Get(':id')
  async getBookById(
    @Param('id')
    id: string,
  ): Promise<Book> {
    return await this.bookService.findById(id);
  }

  @Put(':id')
  async updateBookById(
    @Param('id')
    id: string,
    @Body()
    book: updateBookDto,
  ): Promise<Book> {
    return await this.bookService.updateById(id, book);
  }

  @Delete(':id')
  async deleteBokById(
    @Param('id')
    id: string,
  ): Promise<Book> {
    return await this.bookService.deleteById(id);
  }
}
