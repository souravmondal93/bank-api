import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { LoginUserInput } from './dto/login-user.input';
import { PASSWORD_SALT } from './user.constants';
import { User } from './entities/user.entity';
import { AuthService } from '../auth/auth.service';

// export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  private readonly users = [
    {
      userId: '1',
      username: 'john',
      email: 'john',
      password: 'changeme',
    },
    {
      userId: '2',
      username: 'maria',
      email: 'maria',
      password: 'guess',
    },
  ];

  async create(createUserInput: CreateUserInput) {
    const password = createUserInput.password;
    createUserInput.password = await bcrypt.hash(password, PASSWORD_SALT);
    const user = new this.userModel(createUserInput);
    return user.save();
  }

  findAll() {
    return `This action returns all users`;
  }

  async findOne(id: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ _id: id }).exec();
    if (!user) {
      throw new NotFoundException(`User ${id} not found`);
    }
    return user;
  }

  async findOneByEmail(email: string): Promise<User | undefined> {
    const user = await this.userModel.findOne({ email: email }).exec();
    if (!user) {
      throw new NotFoundException(`User ${email} not found`);
    }
    return user;
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    const existingUser = await this.userModel
      .findOneAndUpdate({ _id: id }, { $set: updateUserInput }, { new: true })
      .exec();

    if (!existingUser) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return existingUser;
  }

  async remove(id: string) {
    const user = await this.userModel.findOne({ _id: id });
    return user.remove();
  }
}
