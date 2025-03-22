import { CreateUrlDto } from './../dto/create-url.dto';
import { Url } from './../entities/url.entity';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UrlDocument } from '../types/url.type';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class UrlService {
  constructor(
    @InjectModel(Url.name) private readonly urlModel: Model<UrlDocument>
  ) {}

  async create(createUrl: CreateUrlDto, userId?: User['_id']) {
    return await this.urlModel.create({
      ...createUrl,
      ...(userId ? { _user: userId } : {}),
    });
  }
  async find(userId?: User['_id']) {
    if (userId) {
      return await this.urlModel
        .find({
          _user: userId,
          status: true,
        })
        .sort({ createdAt: -1 })
        .limit(20);
    }
    return await this.urlModel.find({
      status: true,
    });
  }
  async findOne(short: string, userId?: User['_id']) {
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

  async update(
    _id: string,
    userId: User['_id'],
    updateUrl: Pick<CreateUrlDto, 'short'>
  ) {
    return await this.urlModel.updateOne(
      {
        _id,
        _user: userId,
      },
      {
        $set: {
          short: updateUrl.short,
        },
      }
    );
  }

  async remove(_id: string, userId: User['_id']) {
    return await this.urlModel.updateOne(
      {
        _id,
        _user: userId,
      },
      {
        status: false,
      }
    );
  }
}
