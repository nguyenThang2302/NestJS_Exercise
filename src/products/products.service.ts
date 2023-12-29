import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private usersRepository: Repository<Product>,
  ) {}

  async createOne(product: Partial<Product>): Promise<Product> {
    return this.usersRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return this.usersRepository.find();
  }

  async findOne(id: string): Promise<Product> {
    return this.usersRepository.findOneBy({ id });
  }

  async delete(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }

  async update(id: string, user: Partial<Product>): Promise<Product> {
    await this.usersRepository.update(id, user);
    return this.usersRepository.findOne({ where: { id } });
  }
}
