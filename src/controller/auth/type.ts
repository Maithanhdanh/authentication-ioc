import { IsRequired, IsString, IsMatched, Transform } from 'decorators-utils';
import { AuthToken } from '@domain/token/type';

class GetTokenRequest {
  @IsString()
  @IsRequired()
  // @ts-ignore
  private accountId: string;
}

class VerifyTokenRequest {
  @IsString()
  @IsRequired('Missing authorization token')
  @IsMatched(/^Bearer/, 'token must be start with Bearer')
  @Transform((token) => token.replace('Bearer ', ''))
  // @ts-ignore
  private authorization: string;
}

interface GetTokenResponse {
  user: string;
  accessToken: string;
  refreshToken: AuthToken;
  expiresIn: number;
}

export { GetTokenRequest, VerifyTokenRequest, GetTokenResponse };
