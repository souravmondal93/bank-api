import { Module } from '@nestjs/common';
import { ConfigModule as NestConfigModule } from '@nestjs/config';

import configuration from '../config/configuration';

@Module({
  imports: [
    NestConfigModule.forRoot({
      load: [configuration],
    })
  ],
})
export class ConfigModule {}