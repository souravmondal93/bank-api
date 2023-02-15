import { Resolver, Mutation, Args } from '@nestjs/graphql';

import { AuthService } from './auth.service';
import { Auth } from './entities/auth.entity';
import { LoginUserInput } from './dto/login-user.input';
import { LoggedUserOutput } from './dto/logged-user.output';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => LoggedUserOutput)
  loginUser(@Args('loginUserInput') loginUserInput: LoginUserInput) {
    return this.authService.loginUser(loginUserInput);
  }
}
