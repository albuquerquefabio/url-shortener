import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
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
  async findOne(@Param('short') short: string) {
    const url = await this.urlService.findOne(short);
    if (!url) {
      throw new NotFoundException('URL not found');
    }
    return url;
  }
}
