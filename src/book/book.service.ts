import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { Book } from './schemas/book.schema';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: mongoose.Model<Book>,
  ) {}

  async findAll(): Promise<Book[]> {
    try {
      const books = await this.bookModel.find();
      return books;
    } catch (error) {
      console.log('Error occur while fetcing the data', error);
      throw new HttpException(
        'server-error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  async create(book: Book): Promise<Book> {
    try {
      const res = await this.bookModel.create(book);
      return res;
    } catch (error) {
      console.log('Error occur while creating a new data', error);
      throw new HttpException(
        'server-error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  async findById(id: string): Promise<Book> {
    try {
      const res = await this.bookModel.findById(id).exec();
      if (!res) {
        throw new NotFoundException('Book not found');
      }
      return res;
    } catch (error) {
      console.log(
        `Error occur while fetcing the data of particular ${id}`,
        error,
      );
      throw new HttpException(
        'server-error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  async updateById(id: string, book: Book): Promise<Book> {
    try {
      const result = await this.bookModel.findByIdAndUpdate(id, book, {
        new: true,
        runValidators: true,
      });
      if (!result) {
        throw new NotFoundException('Book not found of this id');
      }
      return result;
    } catch (error) {
      console.log(`Error occur while updating the data of id ${id}`, error);
      throw new HttpException(
        'server-error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
  }

  async deleteById(id: string): Promise<Book> {
    try {
      const result = await this.bookModel.findByIdAndDelete(id);
    if(!result){
      throw new NotFoundException('Book not found of this id')
    }
    return result; 
    } catch (error) {
      console.log('Error occur while deleting the data', error);
      throw new HttpException(
        'server-error',
        HttpStatus.INTERNAL_SERVER_ERROR,
        { cause: error },
      );
    }
   
  }
}
