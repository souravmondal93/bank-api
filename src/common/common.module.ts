import { Module } from '@nestjs/common';
import { GraphqlModule } from './graphql.module';
import { DatabaseModule } from './database.module';
import { ConfigModule } from './config.module';

@Module({
  imports: [ConfigModule, GraphqlModule, DatabaseModule ],
  exports: [ConfigModule, GraphqlModule, DatabaseModule ],
})
export class CommonModule {}