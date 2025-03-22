import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Patch,
  Post,
  Request,
} from '@nestjs/common';
import { UrlService } from '../services/url.service';
import { CreateUrlDto } from '../dto/create-url.dto';
import { User } from '../../users/entities/user.entity';

@Controller('url')
export class UrlCustomController {
  constructor(private readonly urlService: UrlService) {}

  @Post('custom')
  async create(
    @Body() createUrlDto: CreateUrlDto,
    @Request() req: Express.Request & { user: User }
  ) {
    return await this.urlService.create(createUrlDto, req.user.id);
  }

  @Get('custom')
  async find(@Request() req: Express.Request & { user: User }) {
    return await this.urlService.find(req.user.id);
  }

  @Get('custom/:short')
  async findOne(
    @Param('short') short: string,
    @Request() req: Express.Request & { user: User }
  ) {
    const url = await this.urlService.findOne(short, req.user.id);
    if (!url) {
      throw new NotFoundException('URL not found');
    }
    return url;
  }

  @Patch('custom/:id')
  async update(
    @Param('id') id: string,
    @Body() updateUrlDto: Pick<CreateUrlDto, 'short'>,
    @Request() req: Express.Request & { user: User }
  ) {
    return await this.urlService.update(id, updateUrlDto, req.user.id);
  }

  @Delete('custom/:id')
  async remove(
    @Param('id') id: string,
    @Request() req: Express.Request & { user: User }
  ) {
    return await this.urlService.remove(id, req.user.id);
  }
}
