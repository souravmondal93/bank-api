import { Module, forwardRef } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { UsersModule } from '../users/users.module';
import { LocalStrategy } from './local.strategy';
import { jwtConstants } from './constants';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: `${configService.get('JWT_EXPIRATION_TIME')}`
        },
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
  ],
  providers: [AuthResolver, AuthService, LocalStrategy, JwtStrategy, ConfigService],
  exports: [AuthService],
})
export class AuthModule {}

// JwtModule.register({
//   secret: jwtConstants.secret,
//   signOptions: { expiresIn: '60s' },
// }),
