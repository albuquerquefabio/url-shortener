import { SetMetadata } from '@nestjs/common';
import { UserRoles } from '../../api/users/interfaces/users.interface';

export const Roles = (...roles: Array<UserRoles>) =>
  SetMetadata('roles', roles);
