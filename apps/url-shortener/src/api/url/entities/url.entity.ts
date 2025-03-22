import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import env from '../../../config/dotenv/env';
import { shortId } from '../../../utils/short-id';

@Schema({
  timestamps: true,
})
export class Url {
  @Prop({
    type: String,
    required: [true, 'The original URL is required'],
  })
  original!: string;

  @Prop({
    type: String,
    unique: [true, 'The shortened URL must be unique'],
  })
  short?: string;

  @Prop({
    type: Number,
    default: 0,
  })
  clicks?: number;

  @Prop({
    type: Boolean,
    default: true,
  })
  status?: boolean;

  // add _user Type.ObjectId
  @Prop({
    type: Types.ObjectId,
    ref: 'User',
  })
  _user?: Types.ObjectId;
}

export const UrlSchema = SchemaFactory.createForClass(Url);

UrlSchema.index(
  { short: 1, status: 1 },
  {
    background: true,
  }
);

UrlSchema.pre<Url>('save', async function (next) {
  if (!this.short) {
    const UrlModel = this.constructor as Model<Url>;
    let unique = false;
    while (!unique) {
      const generatedShort = shortId(env.url.shortNumber);
      const existing = await UrlModel.findOne({ short: generatedShort });
      if (!existing) {
        this.short = generatedShort;
        unique = true;
      }
    }
  }
  next();
});
