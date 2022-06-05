import { types } from '@config/constants';
import { logGroup } from '@config/customLogger';
import { inject, injectable } from 'inversify';
import { Logger } from 'winston';
import { GetTokenResponse } from '@controller/auth/type';
import { TokenService } from '@domain/token/token';
import environment from '@config/environment';
import { decrypt } from '@utils/encryption';
import jwt from 'jsonwebtoken';

interface AuthenticationService {
  getToken(accountId: string): GetTokenResponse | void;
  verify(token: string): boolean;
}

@logGroup()
@injectable()
class AuthenticationServiceImpl implements AuthenticationService {
  constructor(
    @inject(types.Logger) private logger: Logger,
    @inject(types.Domain.TOKEN) private tokenService: TokenService,
  ) {}

  public getToken(accountId: string): GetTokenResponse | void {
    this.logger.info(`start getting token`);
    this.logger.debug(`start getting token with accountId`, { accountId });

    const accessToken = this.tokenService.getAccessToken(accountId);
    const refreshToken = this.tokenService.getRefreshToken(accountId);

    return {
      user: accountId,
      accessToken: accessToken.token,
      refreshToken,
      expiresIn: accessToken.expiresIn,
    };
  }

  public verify(token: string): boolean {
    this.logger.info(`start verify token`);

    const secret = environment.SECRET;
    const decryptedToken = decrypt(token);
    try {
      jwt.verify(decryptedToken, secret);
      this.logger.info(`valid token`);

      return true;
    } catch (err) {
      this.logger.info(`invalid token`);

      return false;
    }
  }
}

export { AuthenticationService, AuthenticationServiceImpl };
