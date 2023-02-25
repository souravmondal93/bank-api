import { ObjectType, Field } from '@nestjs/graphql';
import * as mongoose from 'mongoose';
import { Schema as MongooseSchema, Decimal128 } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { AccountType } from '../../common/enums/account-type.enum';

@Schema({ timestamps: true })
@ObjectType()
export class Account {

  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId | string;

  @Prop({ required: true })
  @Field(() => String, { description: 'Type' })
  type: AccountType;

  @Prop({ required: true, default: true })
  @Field(() => Boolean, { description: 'Is account active?' })
  isActive: boolean;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  @Field(() => String, { description: 'Owner' })
  owner: MongooseSchema.Types.ObjectId | string;;

  @Prop({ required: true })
  @Field(() => Number, { description: 'Sort Code' })
  sortCode: number;
  
  @Prop({ required: true })
  @Field(() => Number, { description: 'Account Number' })
  accountNumber: number;

  @Prop({ required: true, default: 'GBP' })
  @Field(() => String, { description: 'Currency' })
  currency: string

  @Prop({ required: true, default: 0.00, type: Number })
  @Field(() => Number, { description: 'Balance' })
  balance: Decimal128;
}

export const AccountSchema = SchemaFactory.createForClass(Account);