import { AccessTokenGuard } from '@Security/guards/AccessTokenGuard';
import { RefreshTokenGuard } from '@Security/guards/RefreshTokenGuard';

export const Guards = [AccessTokenGuard, RefreshTokenGuard];
