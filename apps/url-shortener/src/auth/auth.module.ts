import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants/auth-constants';
import { UsersModule } from '../api/users/users.module';
import { ttl } from '../infra/redis/cache-constants';
import { AppCacheModule } from '../infra/redis/cache.module';

@Module({
  imports: [
    AppCacheModule,
    UsersModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: `${ttl.hour}s` },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
