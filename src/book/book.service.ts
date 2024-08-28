import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Book } from './schemas/book.schema';
import { Query } from 'express-serve-static-core';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(query: Query): Promise<Book[]> {
    // console.log(query);
    const resultPerPage = 3;
    const currentPage = Number(query.page) || 1;
    const skipResult = resultPerPage * (currentPage - 1);

    const keyword = query.keyword
      ? {
          title: {
            $regex: query.keyword,
            $options: 'i',
          },
        }
      : {};

    const category = query.category
      ? {
          category: query.category,
        }
      : {};

    const filters = { ...keyword, ...category };
    const books = await this.bookModel
      .find(filters)
      .limit(resultPerPage)
      .skip(skipResult);
    return books;
  }

  async create(book: Book): Promise<Book> {
    const res = await this.bookModel.create(book);
    return res;
  }

  async findById(id: string): Promise<Book> {
    const isValidId = mongoose.isValidObjectId(id);
    if (!isValidId) {
      throw new BadRequestException('Please enter a correct Id');
    }
    const res = await this.bookModel.findById(id).exec();
    if (!res) {
      throw new NotFoundException('Book not found');
    }
    return res;
  }

  async updateById(id: string, book: Book): Promise<Book> {
    const result = await this.bookModel.findByIdAndUpdate(id, book, {
      new: true,
      runValidators: true,
    });
    if (!result) {
      throw new NotFoundException('Book not found of this id');
    }
    return result;
  }

  async deleteById(id: string): Promise<Book> {
    const result = await this.bookModel.findByIdAndDelete(id);
    if (!result) {
      throw new NotFoundException('Book not found of this id');
    }
    return result;
  }
}
