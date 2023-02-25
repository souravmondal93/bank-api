import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Model, ObjectId } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { NewUserUpdateInput } from './dto/new-user-update.input';
import { User } from './entities/user.entity';
import { AccountsService } from '../accounts/accounts.service';
import { AccountType } from '../common/enums/account-type.enum';
import { GraphQLErrorsType } from '../common/types/errors.interface';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly accountsService: AccountsService,
    private readonly configService: ConfigService,
  ) {}

  async create(createUserInput: CreateUserInput) {
    const password = createUserInput.password;
    const salt = this.configService.get('BYCRYPT.BYCRYPT_SALT_ROUNDS');

    createUserInput.password = await bcrypt.hash(password, salt);
    const user = new this.userModel(createUserInput);
    const savedUser = await user.save();

    await this.accountsService.create({
      owner: savedUser._id.toString(),
      type: AccountType.Savings,
    });

    return savedUser;
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
      return { errors: [ { message: `User ${email} not found` } ] } as any;
    }
    return user;
  }

  async update(id: number, updateUserInput: UpdateUserInput) {
    const existingUser = await this.userModel
      .findOneAndUpdate({ _id: id }, { $set: updateUserInput }, { new: true })
      .exec();

    if (!existingUser) {
      return { errors: [ { message: `User not found` } ] } as any;
    }

    return existingUser;
  }

  async updateNewUser(id: string, newUser: NewUserUpdateInput) {
    const existingUser = await this.userModel
      .findOneAndUpdate({ _id: id }, { $set: newUser }, { new: true })
      .exec();

    if (!existingUser) {
      return { errors: [ { message: `User not found` } ] } as any;
    }

    return existingUser;
  }

  async remove(id: ObjectId | string) {
    const user = await this.userModel.findOne({ _id: id });
    return user.remove();
  }
}
