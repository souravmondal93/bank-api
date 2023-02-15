import { ObjectType, Field } from '@nestjs/graphql';
import { Date, Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
@ObjectType()
export class Transaction {

  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId | string;

  @Prop({ required: true })
  @Field(() => String, { description: 'Type' })
  type: string;

  @Prop({ required: true })
  @Field(() => String, { description: 'Payee Name' })
  payeeName: string;

  @Prop({ required: true })
  @Field(() => Date, { description: 'Date' })
  date: Date;

  @Prop({ required: true, default: 0 })
  @Field(() => Number, { description: 'Amount' })
  amount: number;
  
  @Prop({ required: true })
  @Field(() => String, { description: 'Status' })
  status: string;

  @Prop({ required: true })
  @Field(() => String, { description: 'Reference' })
  reference: string

  @Prop({ required: true })
  @Field(() => String, { description: 'Source Account Id' })
  sourceAccountId: MongooseSchema.Types.ObjectId | string;;

  @Prop({ required: true })
  @Field(() => String, { description: 'Sender' })
  sender: MongooseSchema.Types.ObjectId | string;

  @Prop({ required: true, select: false })
  @Field(() => String, { description: 'Recipient' })
  recipient: MongooseSchema.Types.ObjectId | string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);