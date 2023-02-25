import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class NewUserUpdateInput {
  @Field(() => Boolean, { description: 'Is New User?' })
  newUser: boolean;
}