import { Body, Controller, Get, Post } from '@nestjs/common';
import { UrlService } from '../services/url.service';
import { CreateUrlDto } from '../dto/create-url.dto';

@Controller('url')
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post()
  async create(@Body() createUrlDto: CreateUrlDto) {
    return await this.urlService.create(createUrlDto);
  }

  @Get()
  async find() {
    return await this.urlService.find();
  }

  @Get(':short')
  async findOne(short: string) {
    return await this.urlService.findOne(short);
  }
}
