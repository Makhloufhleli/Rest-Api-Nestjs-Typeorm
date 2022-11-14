import { SetMetadata } from '@nestjs/common';
import { UserRoles } from '@Models/enums/UserRoles';

export const ROLES_KEY = 'roles';
export const AuthorizeWithRoles = (...roles: UserRoles[]) => SetMetadata(ROLES_KEY, roles);
