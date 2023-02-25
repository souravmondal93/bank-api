import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

import { CreateTransactionInput } from './dto/create-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { Transaction } from './entities/transaction.entity';
import { AccountsService } from 'src/accounts/accounts.service';


@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name)
    private readonly transactionModel: Model<Transaction>,
    private readonly accountService: AccountsService
  ) {}

  async create(createTransactionInput: CreateTransactionInput) {
    const transaction = new this.transactionModel(createTransactionInput);
    return await transaction.save();
  }

  findAll() {
    return `This action returns all transactions`;
  }

  async findAllTransactionsByCurrentUser(userId) {
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const query = {
      $or: [{ senderId: userObjectId }, { recipientId: userObjectId }],
    };

    const transactions = await this.transactionModel
      .find(query)
      .sort({ 'date': -1 })
      .exec();
    return transactions;
  }

  async findAllCreditCardTransactionsByCurrentUser(userId) {
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const account = await this.accountService.findCreditCardAccountByUserId(userId);
    const accountId = new mongoose.Types.ObjectId(account._id);

    const query = {
      $or: [{ sourceAccountId: accountId }, { recipientAccountId: accountId }],
    };

    const transactions = await this.transactionModel
      .find(query)
      .sort({ 'date': -1 })
      .exec();
    return transactions;
  }

  findOne(id: number) {
    return `This action returns a #${id} transaction`;
  }

  update(id: number, updateTransactionInput: UpdateTransactionInput) {
    return `This action updates a #${id} transaction`;
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
