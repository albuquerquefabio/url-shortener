import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities/user.entity';
import { UsersService } from '../services/users.service';

import { UpdateUserDto } from '../dto/update-user.dto';
import { Public } from '../../../auth/constants/auth-constants';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<User> {
    return await this.usersService.create(createUserDto);
  }

  @Get()
  async findAll(): Promise<Array<User>> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
    @Req()
    req: Express.Request & {
      user: User;
    }
  ): Promise<Partial<User>> {
    const userId = req.user.id;
    const select = userId !== id ? { password: false } : {};
    return await this.usersService.findOne(id, select);
  }

  @Patch()
  async update(
    @Body() updatedDto: UpdateUserDto,
    @Req()
    req: Express.Request & {
      user: User;
    }
  ): Promise<Partial<User>> {
    return await this.usersService.update(req.user.id, updatedDto);
  }
  @Delete()
  async delete(
    @Req()
    req: Express.Request & {
      user: User;
    }
  ): Promise<Record<string, string | boolean>> {
    await this.usersService.delete(req.user.id);
    return { message: 'Done', status: true };
  }
}
