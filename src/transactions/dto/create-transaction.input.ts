import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsString,
  IsNotEmpty,
  IsEnum,
  IsNumber,
  IsPositive,
  IsDateString,
} from 'class-validator';

import { TransactionType } from '../../common/enums/transaction-type.enum';
import { TransactionStatus } from '../../common/enums/transaction-status.enum';

@InputType()
export class CreateTransactionInput {
  @Field()
  @IsEnum(TransactionType)
  @IsNotEmpty()
  type: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  payeeName: string;

  @Field()
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @Field()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  amount: number;

  @Field()
  @IsEnum(TransactionStatus)
  @IsNotEmpty()
  status: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  reference: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  sourceAccountId: string;
  
  @Field()
  @IsString()
  @IsNotEmpty()
  senderId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  recipientId: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  recipientAccountId: string;
}
