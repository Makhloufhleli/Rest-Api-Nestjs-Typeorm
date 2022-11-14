import { GetCurrentUserId } from '@src/Decorators/GetCurrentUserId';
import { GetCurrentUser } from '@src/Decorators/GetCurrentUser';
import { Public } from '@src/Decorators/Public';

export const Decorators = [GetCurrentUserId, GetCurrentUser, Public];
