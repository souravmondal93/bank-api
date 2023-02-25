import { ObjectType, Field, GraphQLISODateTime } from '@nestjs/graphql';
import { Schema as MongooseSchema, Date } from 'mongoose';
import * as mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory,  } from '@nestjs/mongoose';

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

  @Prop({ required: true, type: mongoose.Schema.Types.Date })
  @Field(() => Date, { description: 'Date' })
  date: Date;

  @Prop({ required: true })
  @Field(() => Number, { description: 'Amount' })
  amount: number;
  
  @Prop({ required: true })
  @Field(() => String, { description: 'Status' })
  status: string;

  @Prop({ required: true })
  @Field(() => String, { description: 'Reference' })
  reference: string

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  @Field(() => String, { description: 'Source Account Id' })
  sourceAccountId: MongooseSchema.Types.ObjectId | string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  @Field(() => String, { description: 'Sender' })
  senderId: MongooseSchema.Types.ObjectId | string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  @Field(() => String, { description: 'Recipient' })
  recipientId: MongooseSchema.Types.ObjectId | string;

  @Prop({ required: true, type: mongoose.Schema.Types.ObjectId })
  @Field(() => String, { description: 'Recepient Account Id' })
  recipientAccountId: MongooseSchema.Types.ObjectId | string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);