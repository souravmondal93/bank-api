import { InputType, Int, Field } from '@nestjs/graphql';
import {
  IsEmail,
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
  IsPhoneNumber,
  IsNumber,
  IsPositive,
} from 'class-validator';


@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  firstName: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  lastName: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  address: string;

  @Field()
  @IsString()
  @IsNotEmpty()
  occupation: string;

  @Field()
  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  income: number;

  @Field()
  @IsString ()
  @IsNotEmpty()
  pan: string;

  @Field()
  @IsPhoneNumber()
  @IsNotEmpty()
  phone: string;

  @Field()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password too weak',
  })
  password: string;
}
