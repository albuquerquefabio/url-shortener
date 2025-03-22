import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Reflector } from '@nestjs/core';
import { Request } from 'express';

import { IS_PUBLIC_KEY, jwtConstants } from '../constants/auth-constants';
import { User } from '../../api/users/entities/user.entity';
import { CacheService } from '../../infra/redis/cache.service';

@Injectable()
export class LocalAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private redisCache: CacheService
  ) {}

  async canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    if (!token) throw new UnauthorizedException();
    try {
      const payload = await this.verifyToken(token);
      if (!payload) throw new UnauthorizedException();

      const redisToken = await this.verifyToken(
        await this.getRedisToken(payload.id, token)
      );

      if (!redisToken) throw new UnauthorizedException();

      request['user'] = redisToken;
    } catch (error) {
      throw new UnauthorizedException();
    }

    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }

  private async getRedisToken(
    key: string | number,
    token: string
  ): Promise<string> {
    const result = await this.redisCache.readData<{
      access_token: string;
    }>(`#Session-${key}:${token}`);

    if (!result) throw new UnauthorizedException();
    return result.access_token;
  }

  private async verifyToken(
    token: string
  ): Promise<Pick<User, 'username' | 'email' | 'id' | 'roles'>> {
    try {
      return await this.jwtService.verifyAsync(token, {
        secret: jwtConstants.secret,
      });
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
