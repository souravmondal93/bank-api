import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { InsightsService } from './insights.service';
import { InsightsResolver } from './insights.resolver';
import { Insight, InsightSchema } from './entities/insight.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Insight.name,
        schema: InsightSchema,
      },
    ]),
  ],
  providers: [InsightsResolver, InsightsService]
})
export class InsightsModule {}
