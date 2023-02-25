import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { TransactionsService } from './transactions.service';
import { TransactionsResolver } from './transactions.resolver';
import { DateScalar } from '../common/scalers/date.scaler';
import { Transaction, TransactionSchema } from './entities/transaction.entity';
import { CommonModule } from '../common/common.module';
import { AccountsModule } from '../accounts/accounts.module';

@Module({
  imports: [
    AccountsModule,
    CommonModule,
    MongooseModule.forFeature([
      {
        name: Transaction.name,
        schema: TransactionSchema,
      },
    ]),
  ],
  providers: [TransactionsResolver, TransactionsService, DateScalar]
})
export class TransactionsModule {}
