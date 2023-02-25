// import { ObjectType, Field, Int } from '@nestjs/graphql';

// @ObjectType()
// export class User {
//   @Field(() => Int, { description: 'Example field (placeholder)' })
//   exampleField: number;

//   @Field(() => String)
//   userId: string;

//   @Field(() => String)
//   username: string;

//   @Field(() => String)
//   password: string;
// }


import { ObjectType, Field } from '@nestjs/graphql';
import { Schema as MongooseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ timestamps: true })
@ObjectType()
export class User {

  @Field(() => String)
  _id: MongooseSchema.Types.ObjectId | string;

  @Prop({ required: true })
  @Field(() => String, { description: 'User firstName ' })
  firstName: string;

  @Prop({ required: true })
  @Field(() => String, { description: 'User lastName ' })
  lastName: string;

  @Prop({ required: true, unique: true })
  @Field(() => String, { description: 'User email ' })
  email: string;

  @Prop({ required: true })
  @Field(() => String, { description: 'User address ' })
  address: string;
  
  @Prop({ required: true })
  @Field(() => String, { description: 'User occupation ' })
  occupation: string;

  @Prop({ required: true })
  @Field(() => Number, { description: 'User income ' })
  income: number

  @Prop({ required: true })
  @Field(() => String, { description: 'User pan ' })
  pan: string;

  @Prop({ required: true })
  @Field(() => String, { description: 'User phone ' })
  phone: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: true })
  @Field(() => Boolean, { description: 'Is New User ' })
  newUser: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);