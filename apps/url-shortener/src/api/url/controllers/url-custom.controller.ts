import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { UrlService } from '../services/url.service';
import { CreateUrlDto } from '../dto/create-url.dto';
import { User } from '../../users/entities/user.entity';

@Controller('url-custom')
export class UrlCustomController {
  constructor(private readonly urlService: UrlService) {}

  @Post('')
  async create(
    @Body() createUrlDto: CreateUrlDto,
    @Request() req: Express.Request & { user: User }
  ) {
    return await this.urlService.create(createUrlDto, req.user.id);
  }

  @Get('')
  async find(@Request() req: Express.Request & { user: User }) {
    return await this.urlService.find(req.user.id);
  }

  @Get('/:short')
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

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() updateUrlDto: Pick<CreateUrlDto, 'short'>,
    @Request() req: Express.Request & { user: User }
  ) {
    return await this.urlService.update(id, req.user.id, updateUrlDto);
  }

  @Delete('/:id')
  async remove(
    @Param('id') id: string,
    @Request() req: Express.Request & { user: User }
  ) {
    return await this.urlService.remove(id, req.user.id);
  }
}
