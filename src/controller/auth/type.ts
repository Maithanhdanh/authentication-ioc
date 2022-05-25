import { IsRequired, IsString } from 'decorators-utils';
import { AuthToken } from '@domain/token/type';

class GetTokenRequest {
  @IsString()
  @IsRequired()
  // @ts-ignore
  private accountId: string;
}

interface GetTokenResponse {
  user: string;
  accessToken: string;
  refreshToken: AuthToken;
  expiresIn: number;
}

export { GetTokenRequest, GetTokenResponse };
