import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants/auth-constants';
import { User } from '../api/users/entities/user.entity';
import { UsersService } from '../api/users/services/users.service';
import { ttl } from '../infra/redis/cache-constants';
import { CacheService } from '../infra/redis/cache.service';
import { checkPassword } from '../utils/utility';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private redisCache: CacheService
  ) {}

  async signIn(
    username: string,
    password: string
  ): Promise<{ access_token: string }> {
    const user = await this.validateUser(username, password);

    const access_token = await this.generateToken(user);
    await this.storeToken(user._id, access_token);
    return { access_token };
  }

  async signOut(token: string, userId: number): Promise<void> {
    const verifiedToken = await this.doubleCheck(token, userId);
    await this.redisCache.deleteData(verifiedToken);
  }

  private async validateUser(
    username: string,
    pass: string
  ): Promise<Omit<User, 'password'>> {
    const user = await this.usersService.findOne(username);
    if (!user) throw new UnauthorizedException();
    const { password, ...result } = user;
    if (!password) throw new UnauthorizedException();
    await checkPassword(pass, password);
    return result as Required<User>;
  }

  private async generateToken(user: Omit<User, 'password'>): Promise<string> {
    const { username, name, _id: id, roles, email } = user;
    const payload = { username, name, id: String(id), roles, email };
    return await this.jwtService.signAsync(payload);
  }

  private async storeToken(userId: User['_id'], token: string): Promise<void> {
    await this.redisCache.createData(
      `#Session-${userId}:${token}`,
      { access_token: token },
      ttl.hour
    );
  }

  private async doubleCheck(
    authorization: string,
    userId: number
  ): Promise<string> {
    if (!authorization || !userId)
      throw new BadRequestException('Some user data must be provided');
    const [type, token] = authorization?.split(' ') ?? [];
    if (type !== 'Bearer') throw new UnauthorizedException();
    const user = await this.jwtService.verifyAsync<{ id: number }>(token, {
      secret: jwtConstants.secret,
    });

    if (user?.id !== userId) throw new UnauthorizedException();
    return token;
  }
}
