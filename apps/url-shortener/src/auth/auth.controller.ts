import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';

import { AuthService } from './auth.service';
import { Public } from './constants/auth-constants';
import { AuthDto } from './dto/auth.dto';
import { User } from '../api/users/entities/user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() auth: AuthDto) {
    const token = await this.authService.signIn(auth.username, auth.password);
    return token;
  }

  @Get('me')
  getProfile(@Request() req: Express.Request & { user: User }) {
    return req.user;
  }

  @Delete('/logout')
  async logout(
    @Request()
    req: Express.Request & { user: User; headers: { authorization: string } }
  ) {
    return await this.authService.signOut(
      req.headers.authorization,
      req.user.id
    );
  }
}
