import { AuthService } from './../auth.service';
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  override validate(...args: any[]): unknown {
    throw new Error('Method not implemented.');
  }

  // @ts-ignore
  constructor(private authService: AuthService) {
    super();
  }
}
