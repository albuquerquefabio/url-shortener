import { Url } from './../entities/url.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UrlDocument } from '../types/url.type';

@Injectable()
export class UrlCheckerService {
  constructor(
    @InjectModel(Url.name) private readonly urlModel: Model<UrlDocument>
  ) {}

  async checker(short: string) {
    const data = await this.urlModel
      .findOne(
        {
          short,
          status: true,
        },
        '_id'
      )
      .exec();

    return { has: Boolean(data) };
  }
}
