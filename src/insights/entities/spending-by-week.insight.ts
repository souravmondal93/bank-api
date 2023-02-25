import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SpendingByWeekDocument = SpendingByWeek & Document;

@Schema()
export class SpendingByWeek {
  @Prop()
  @Field(() => [String])
  week: [string];

  @Prop()
  @Field(() => [Number])
  spending: [number];
}

@ObjectType()
export class SpendingByWeekType {
  @Field(type => [String], { nullable: true })
  week: [string];

  @Field(type => [Number], { nullable: true })
  spending: [number];
}

export const SpendingByWeekSchema = SchemaFactory.createForClass(SpendingByWeek);
