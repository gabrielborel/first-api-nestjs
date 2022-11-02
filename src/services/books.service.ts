import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Book } from '../models/book.model';

interface ICreateBook {
  name: string;
  price: number;
  code: string;
}

interface IUpdateBook {
  id: string;
  name?: string;
  price?: number;
  code?: string;
}

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book)
    private bookModel: typeof Book,
  ) {}

  async findAll(): Promise<Book[]> {
    return await this.bookModel.findAll();
  }

  async findOne(id: string): Promise<Book> {
    return await this.bookModel.findByPk(id);
  }

  async create(data: ICreateBook): Promise<Book> {
    return await this.bookModel.create({ ...data });
  }

  async update(data: IUpdateBook) {
    await this.bookModel.update({ ...data }, { where: { id: data.id } });
    return this.bookModel.findByPk(data.id);
  }

  async delete(id: string): Promise<Book[]> {
    await this.bookModel.destroy({ where: { id } });
    return await this.bookModel.findAll();
  }
}
