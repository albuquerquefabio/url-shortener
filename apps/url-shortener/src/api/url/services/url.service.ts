import { CreateUrlDto } from './../dto/create-url.dto';
import { Url } from './../entities/url.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UrlDocument } from '../types/url.type';

@Injectable()
export class UrlService {
  constructor(
    @InjectModel(Url.name) private readonly urlModel: Model<UrlDocument>
  ) {}

  async create(createUrl: CreateUrlDto) {
    return await this.urlModel.create(createUrl);
  }
  async find() {
    return await this.urlModel.find({
      status: true,
    });
  }
  async findOne(short: string) {
    const [url] = await Promise.all([
      this.urlModel.findOne({
        short,
        status: true,
      }),
      this.urlModel.updateOne(
        {
          short,
          status: true,
        },
        {
          $inc: {
            clicks: 1,
          },
        }
      ),
    ]);

    return url;
  }
}
