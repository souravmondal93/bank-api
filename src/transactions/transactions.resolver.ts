import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int, Context } from '@nestjs/graphql';

import { TransactionsService } from './transactions.service';
import { Transaction } from './entities/transaction.entity';
import { CreateTransactionInput } from './dto/create-transaction.input';
import { UpdateTransactionInput } from './dto/update-transaction.input';
import { GqlAuthGuard } from '../auth/gql-auth-guard';
import { CurrentUser } from '../decorators/current-user';

@Resolver(() => Transaction)
export class TransactionsResolver {
  constructor(private readonly transactionsService: TransactionsService) {}

  @UseGuards(GqlAuthGuard)
  @Mutation(() => Transaction)
  async createTransaction(
    @Args('createTransactionInput') createTransactionInput: CreateTransactionInput,
    @Context() context: { req: any }
  ) {
    console.log('User: ', context.req.user);

    return await this.transactionsService.create(createTransactionInput);
  }

  @Query(() => [Transaction], { name: 'transactions' })
  findAll() {
    return this.transactionsService.findAll();
  }

  @Query(() => [Transaction], { name: 'transactionsByCurrentUser' })
  @UseGuards(GqlAuthGuard)
  findAllTransactionsByCurrentUser(@CurrentUser() user: any) {
    return this.transactionsService.findAllTransactionsByCurrentUser(user._id);
  }

  @Query(() => [Transaction], { name: 'CreditCarTransactionsByCurrentUser' })
  @UseGuards(GqlAuthGuard)
  findAllCreditCardTransactionsByCurrentUser(@CurrentUser() user: any) {
    return this.transactionsService.findAllCreditCardTransactionsByCurrentUser(user._id);
  }

  @Query(() => Transaction, { name: 'transaction' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.transactionsService.findOne(id);
  }

  @Mutation(() => Transaction)
  updateTransaction(@Args('updateTransactionInput') updateTransactionInput: UpdateTransactionInput) {
    return this.transactionsService.update(updateTransactionInput.id, updateTransactionInput);
  }

  @Mutation(() => Transaction)
  removeTransaction(@Args('id', { type: () => Int }) id: number) {
    return this.transactionsService.remove(id);
  }
}
