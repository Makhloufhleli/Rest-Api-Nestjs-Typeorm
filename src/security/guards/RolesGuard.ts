import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRoles } from '@Models/enums/UserRoles';
import { ROLES_KEY } from '@src/Decorators/AuthorizeWithRoles';
import { UserRepository } from '@src/repositories/UserRepository';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private userRepository: UserRepository) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<UserRoles[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const { user } = context.switchToHttp().getRequest();
    const userToAuthorize = await this.userRepository.getUserById(user.sub);
    return requiredRoles.some((role) => userToAuthorize.role?.includes(role));
  }
}
