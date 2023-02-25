import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { CommonModule } from '../common/common.module';
import { Account, AccountSchema } from './entities/account.entity';
import { AccountsService } from './accounts.service';
import { AccountsResolver } from './accounts.resolver';

@Module({
  imports: [
    ConfigModule,
    CommonModule,
    MongooseModule.forFeature([
      {
        name: Account.name,
        schema: AccountSchema,
      },
    ]),
  ],
  providers: [AccountsResolver, AccountsService],
  exports: [AccountsService]
})
export class AccountsModule {}
