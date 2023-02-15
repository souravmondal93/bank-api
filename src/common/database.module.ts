// import { Module } from '@nestjs/common';
// import { databaseProviders } from './database.providers';

// @Module({
//   providers: [...databaseProviders],
//   exports: [...databaseProviders],
// })
// export class DatabaseModule {}

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_DETAILS.MONGODB_CONNECTION_STRING'),
      }),
      inject: [ConfigService],
    }),
  ],
})

export class DatabaseModule {}