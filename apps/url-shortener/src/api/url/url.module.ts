import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import db from '../../infra/mongodb/db';
import { UrlController } from './controllers/url.controller';
import { UrlService } from './services/url.service';
import { UrlCustomController } from './controllers/url-custom.controller';
import { UrlCheckerController } from './controllers/url-checker.controller';
import { UrlCheckerService } from './services/url-checker.service';

@Module({
  imports: [MongooseModule.forFeature(db)],
  controllers: [UrlController, UrlCustomController, UrlCheckerController],
  providers: [UrlService, UrlCheckerService],
  exports: [UrlService, UrlCheckerService],
})
export class UrlModule {}
