import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import db from '../../infra/mongodb/db';
import { UrlController } from './controllers/url.controller';
import { UrlService } from './services/url.service';

@Module({
  imports: [MongooseModule.forFeature(db)],
  controllers: [UrlController],
  providers: [UrlService],
  exports: [UrlService],
})
export class UrlModule {}
