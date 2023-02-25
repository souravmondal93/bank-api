import { InputType, Field } from '@nestjs/graphql';
import {
  IsNotEmpty,
  IsEnum,
  IsMongoId,
} from 'class-validator';
import { Schema as MongooseSchema } from 'mongoose';

import { AccountType } from '../../common/enums/account-type.enum';

@InputType()
export class CreateAccountInput {
  @Field()
  @IsEnum(AccountType)
  @IsNotEmpty()
  type: string;

  @Field()
  @IsMongoId()
  @IsNotEmpty()
  owner: string;
}
