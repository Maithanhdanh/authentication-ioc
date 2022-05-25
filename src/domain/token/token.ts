import environment from '@server/config/environment';
import { TokenType, AuthToken } from '@domain/token/type';
import jwt from 'jsonwebtoken';
import { encrypt } from '@utils/encryption';
import { expiresInNumber, expiresInString } from '@domain/token/constant';
import { logGroup } from '@config/customLogger';
import { inject, injectable } from 'inversify';
import { types } from '@config/constants';
import { Logger } from 'winston';

export interface TokenService {
  getAccessToken(accountId:string): AuthToken,
  getRefreshToken(accountId:string): AuthToken
}

@logGroup()
@injectable()
export class TokenServiceImpl implements TokenService {
  constructor(@inject(types.Logger) private logger: Logger) {}

  public getAccessToken(accountId: string): AuthToken {
    this.logger.debug('generate accessToken for accountId',{accountId})
    return this.generateToken(accountId, TokenType.ACCESS_TOKEN);
  }

  public getRefreshToken(accountId: string): AuthToken {
    this.logger.debug('generate refreshToken for accountId',{accountId})
    return this.generateToken(accountId, TokenType.REFRESH_TOKEN);
  }

  private generateToken(accountId: string, type: TokenType): AuthToken {
    const audience = environment.AUDIENCE;
    const secret = environment.SECRET;

    const expiresIn = expiresInString[type];

    const token = jwt.sign({ type }, secret, {
      expiresIn,
      audience: audience,
      issuer: accountId,
    });

    const expiresInNum = expiresInNumber[type];

    return {
      token: encrypt(token),
      expiresIn: Date.now() + expiresInNum,
    };
  }
}
