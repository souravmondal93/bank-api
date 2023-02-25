import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Insight } from './entities/insight.entity';

@Injectable()
export class InsightsService {
  constructor(
    @InjectModel(Insight.name)
    private readonly insightModel: Model<Insight>,
  ) {}

  async findAll() {
    const insights = await this.insightModel.find().exec() as any;
    return insights[0];
  }
}
