import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoggerService } from 'src/common/logger/logger.service';
import { Repository } from 'typeorm';
import { Users } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    private readonly loggerService: LoggerService,
  ) {}

  create(users: Partial<Users>): Promise<Users> {
    return this.usersRepository.save(users);
  }

  findOne(id: string): Promise<Users> {
    return this.usersRepository.findOneBy({ id });
  }

  findExisting(username: string): Promise<Users> {
    return this.usersRepository.findOneBy({ username });
  }
}
