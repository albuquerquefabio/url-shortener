import { User } from '../api/users/entities/user.entity';
import {
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { hash, compare } from 'bcrypt';
import { UserRoles } from '../api/users/interfaces/users.interface';

export const hasObject = (obj: unknown) => {
  if (typeof obj === 'string') {
    try {
      const parsed = JSON.parse(obj);
      return parsed && typeof parsed === 'object' && Object.keys(parsed).length;
    } catch {
      return false;
    }
  }
  return obj && typeof obj === 'object' && Object.keys(obj as object).length;
};

export const hashPassword = async (password: string): Promise<string> => {
  const saltOrRounds = 10;
  const hashedPassword = await hash(password, saltOrRounds);

  if (!hashedPassword)
    throw new InternalServerErrorException('Password hashing failed.');

  return hashedPassword;
};

export const checkPassword = async (
  password: string,
  hashed: string
): Promise<void> => {
  const bool = await compare(password, hashed);

  if (!bool) throw new UnauthorizedException('Password incorrect.');
};

export const hasRole = (
  base: UserRoles | User['roles'],
  roles: User['roles']
): boolean => {
  if (!Array.isArray(roles)) return false;
  if (typeof base === 'string') return roles.includes(base);
  const baseSet = new Set(base);
  return roles.some((role) => baseSet.has(role));
};

export const isId = (id: string): boolean =>
  Boolean(id.length === 24 && id.match(/^[0-9a-fA-F]{24}$/));
