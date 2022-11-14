import { User } from '@Models/entities/User';

export class TokensDataResponse {
  user?: User;
  accessToken: string;
  refreshToken: string;
}
