import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ErrorHttpResponse,
  ValidHttpResponse,
} from '../packages/handler/response/validHttp.response';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const isExisting = await this.usersService.findExisting(
      createUserDto.username,
    );

    if (!isExisting) {
      const data = await this.usersService.create(createUserDto);

      return ValidHttpResponse.toCreatedResponse(
        'Register user successfully',
        data,
      );
    }

    return ErrorHttpResponse.errorResponse(
      'GPID_0001',
      'System error',
      `User is existing.Try again`,
    );
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }
}
