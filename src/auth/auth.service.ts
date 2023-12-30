import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Users } from 'src/users/entities/user.entity';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findExisting(username);
    if (!user) {
      throw new UnauthorizedException('User is not existing');
    }

    const check = await this.comparePassword(pass, user.password);
    if (!check) {
      throw new UnauthorizedException('Password is incorrect');
    }

    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async register(username: string, password: string): Promise<any> {
    const user = new Users();
    user.username = username;
    user.password = password;

    return await this.usersService.create(user);
  }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findExisting(username);
    if (user && user.password === pass) {
      return user;
    }
    return null;
  }

  async hashPassword(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 12);
    return hash;
  }

  async comparePassword(
    password: string,
    storePasswordHash: string,
  ): Promise<any> {
    return await bcrypt.compare(password, storePasswordHash);
  }
}
