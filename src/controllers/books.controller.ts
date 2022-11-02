import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { BooksService } from '../services/books.service';
import { Book } from '../models/book.model';

interface ICreateBook {
  id: string;
  name: string;
  code: string;
  price: number;
}

interface IUpdateBook {
  id: string;
  name?: string;
  code?: string;
  price?: number;
}

interface IFindBook {
  id: string;
}

interface IDeleteBook {
  id: string;
}

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  findAll(): Promise<Book[]> {
    return this.booksService.findAll();
  }

  @Get(':id')
  findOne(@Param() { id }: IFindBook): Promise<Book> {
    return this.booksService.findOne(id);
  }

  @Post()
  create(@Body() data: ICreateBook): Promise<Book> {
    return this.booksService.create(data);
  }

  @Put()
  update(@Body() data: IUpdateBook): Promise<Book> {
    return this.booksService.update(data);
  }

  @Delete(':id')
  delete(@Param() { id }: IDeleteBook): Promise<Book[]> {
    return this.booksService.delete(id);
  }
}
