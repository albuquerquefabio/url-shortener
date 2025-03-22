import { Controller, Get, Param } from '@nestjs/common';
import { UrlCheckerService } from '../services/url-checker.service';

@Controller('url')
export class UrlCheckerController {
  constructor(private readonly urlService: UrlCheckerService) {}

  @Get('checker/:short')
  async create(@Param('short') short: string) {
    return await this.urlService.checker(short);
  }
}
