import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import {
  ErrorHttpResponse,
  ValidHttpResponse,
} from '../packages/handler/response/validHttp.response';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthGuard } from './guards/auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @HttpCode(HttpStatus.OK)
  @Post('register')
  async register(@Body() signUpDto: CreateAuthDto) {
    const isExisting = await this.userService.findExisting(signUpDto.username);

    if (!isExisting) {
      const hashPass: string = await this.authService.hashPassword(
        signUpDto.password,
      );

      const data = await this.authService.register(
        signUpDto.username,
        hashPass,
      );

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

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
