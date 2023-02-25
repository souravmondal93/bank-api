import { ObjectType, Field } from '@nestjs/graphql';
import { Type } from '@nestjs/common';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

import { SpendingByWeek, SpendingByWeekSchema, SpendingByWeekType } from './spending-by-week.insight';

interface SpendingByWeekInterface {
  week: [string];
  spending: [number];
}


@Schema({ timestamps: true })
@ObjectType()
export class Insight {

  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId | string;

  @Prop()
  @Field(() => Number)
  startingBalance: number;

  @Prop()
  @Field(() => String)
  startingBalanceChange: string;

  @Prop()
  @Field(() => Number)
  totalMoneyIn: number;

  @Prop()
  @Field(() => String)
  totalMoneyInChange: string;

  @Prop()
  @Field(() => Number)
  totalMoneyOut: number;

  @Prop()
  @Field(() => String)
  totalMoneyOutChange: string;

  @Prop()
  @Field(() => Number)
  leftToSpend: number;

  @Prop()
  @Field(() => String)
  leftToSpendChange: string;

  @Prop()
  @Field(() => Number)
  shoppingExpenditure: number;

  @Prop()
  @Field(() => Number)
  groceriesExpenditure: number;

  @Prop()
  @Field(() => Number)
  billsExpenditure: number;

  @Prop()
  @Field(() => Number)
  miscExpenditure: number;
  
  @Prop({ type: SpendingByWeekSchema })
  @Field(() => SpendingByWeekType)
  spendingByWeek: SpendingByWeekInterface;

  @Prop()
  @Field(() => String)
  lastWeekChange: string;

  @Prop()
  @Field(() => [Number])
  savingsAccountByMonth: [number];

  @Prop()
  @Field(() => [Number])
  creditCardByMonth: [number];

  @Prop()
  @Field(() => [String])
  months: [string];

  @Prop()
  @Field(() => String)
  lastYearChange: string;
}

export const InsightSchema = SchemaFactory.createForClass(Insight);