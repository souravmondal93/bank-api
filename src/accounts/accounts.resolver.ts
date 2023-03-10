import { UseGuards } from '@nestjs/common';
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';

import { AccountsService } from './accounts.service';
import { Account } from './entities/account.entity';
import { CreateAccountInput } from './dto/create-account.input';
import { UpdateAccountInput } from './dto/update-account.input';
import { GqlAuthGuard, UserDetailsFromJwt } from '../auth/gql-auth-guard';
import { CurrentUser } from '../decorators/current-user';

@Resolver(() => Account)
export class AccountsResolver {
  constructor(private readonly accountsService: AccountsService) {}

  @Mutation(() => Account)
  createAccount(@Args('createAccountInput') createAccountInput: CreateAccountInput) {
    return this.accountsService.create(createAccountInput);
  }

  @Query(() => [Account], { name: 'accounts' })
  findAll() {
    return this.accountsService.findAll();
  }

  @Query(() => Account, { name: 'account' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.accountsService.findOne(id);
  }

  @Mutation(() => Account)
  updateAccount(@Args('updateAccountInput') updateAccountInput: UpdateAccountInput) {
    return this.accountsService.update(updateAccountInput.id, updateAccountInput);
  }

  @Mutation(() => Account)
  removeAccount(@Args('id', { type: () => Int }) id: number) {
    return this.accountsService.remove(id);
  }

  @Query(() => Account)
  @UseGuards(GqlAuthGuard)
  getMyAccount(@CurrentUser() user: UserDetailsFromJwt) {
    return this.accountsService.findOneByUserId(user._id);
  }

  @Query(() => Account)
  @UseGuards(GqlAuthGuard)
  getMyCreditCardAccount(@CurrentUser() user: UserDetailsFromJwt) {
    return this.accountsService.findCreditCardAccountByUserId(user._id);
  }
}
