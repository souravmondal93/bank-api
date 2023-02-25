import { Resolver, Query } from '@nestjs/graphql';


import { InsightsService } from './insights.service';
import { Insight } from './entities/insight.entity';

@Resolver()
export class InsightsResolver {
  constructor(private readonly insightsService: InsightsService) {}

  @Query(() => Insight, { name: 'insights' })
  async findAll() {
    return await this.insightsService.findAll();
  }
}
