import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { CreateAuthInput } from './dto/create-auth.input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';
import { LoginUserInput } from './dto/login-user.input';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService, 
    private jwtService: JwtService
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user) {
      if (await bcrypt.compare(password, user.password)) {
        const { password, ...result } = user;
        return result;
      }
    }

    return null;
  }

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async loginUser(loginUserInput: LoginUserInput) {
    const user = await this.validateUser(
      loginUserInput.email,
      loginUserInput.password,
    );
    if (!user) {
      throw new BadRequestException(`Email or password are invalid`);
    } else {
      return this.generateUserCredentials(user);
    }
  }

  async generateUserCredentials(user: User) {
    const payload = {
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
