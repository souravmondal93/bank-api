import { ObjectType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
@ObjectType()
export class Account {

  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId | string;

  @Prop({ required: true })
  @Field(() => String, { description: 'Type' })
  type: string;

  @Prop({ required: true })
  @Field(() => Boolean, { description: 'Is account active?' })
  isActive: boolean;

  @Prop({ required: true })
  @Field(() => String, { description: 'Owner' })
  owner: MongooseSchema.Types.ObjectId | string;;

  @Prop({ required: true })
  @Field(() => Number, { description: 'Sort Code' })
  sortcode: number;
  
  @Prop({ required: true })
  @Field(() => Number, { description: 'Account Number' })
  accountNumber: number;

  @Prop({ required: true, default: 'GBP' })
  @Field(() => String, { description: 'Currency' })
  currency: string

  @Prop({ required: true, default: 0 })
  @Field(() => Number, { description: 'Balance' })
  balance: number;
}

export const AccountSchema = SchemaFactory.createForClass(Account);