import { types } from '@config/constants';
import { logGroup } from '@config/customLogger';
import { inject, injectable } from 'inversify';
import { Logger } from 'winston';
import { GetTokenResponse } from '@controller/auth/type';
import { TokenService } from '@domain/token/token';

interface AuthenticationService {
  getToken(accountId: string): GetTokenResponse | void;
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
}

export { AuthenticationService, AuthenticationServiceImpl };
