import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from '@Models/shared/JwtPayload';

export const GetCurrentUserId = createParamDecorator(
  (_: undefined, context: ExecutionContext): number => {
    const request = context.switchToHttp().getRequest();
    const user = request.user as JwtPayload;
    return user.sub;
  },
);