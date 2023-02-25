import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { Account } from './entities/account.entity';
import { CreateAccountInput } from './dto/create-account.input';
import { UpdateAccountInput } from './dto/update-account.input';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel(Account.name)
    private readonly accountModel: Model<Account>,
    private readonly configService: ConfigService
  ) {}

  getAccountNumber(): number {
    return Math.floor(100000000 + Math.random() * 900000000);
  }

  async create(createAccountInput: CreateAccountInput) {
    const accountNumber = this.getAccountNumber();
    const sortCode = this.configService.get('SORT_CODE')

    const accountDetails = new this.accountModel({
      ...createAccountInput,
      accountNumber,
      sortCode,
      isActive: true,
    });

    return await accountDetails.save();
  }

  findAll() {
    return `This action returns all accounts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} account`;
  }

  async findOneByUserId(userId: string) {
    const account = await this.accountModel.findOne({ owner: userId, type: 'SAVINGS_ACCOUNT' }).exec();
    if (!account) {
      return { errors: [ { message: `Account not found for this user.` } ] } as any;
    }
    return account;
  }

  async findCreditCardAccountByUserId(userId: string) {
    const account = await this.accountModel.findOne({ owner: userId, type: 'CREDIT_CARD_ACCOUNT' }).exec();

    if (!account) {
      return { errors: [ { message: `Account not found for this user.` } ] } as any;
    }
    return account;
  }

  update(id: number, updateAccountInput: UpdateAccountInput) {
    return `This action updates a #${id} account`;
  }

  remove(id: number) {
    return `This action removes a #${id} account`;
  }
}
