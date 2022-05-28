import { createContainer } from '@config/container';
import { types } from '@config/constants';
import { TokenServiceImpl } from '@server/domain/token/token';
import { sampleToken } from '@tests/fixtures/token';
import { AuthenticationService } from '@application/auth-service/authentication.service';

describe('Authentication Service', () => {
  let authenticationService: AuthenticationService;

  beforeEach(() => {
    const container = createContainer();
    authenticationService = container.get<AuthenticationService>(types.Service.AUTH);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return service info', () => {
    jest.spyOn(TokenServiceImpl.prototype, 'getAccessToken').mockReturnValue(sampleToken);
    jest.spyOn(TokenServiceImpl.prototype, 'getRefreshToken').mockReturnValue(sampleToken);

    const accountId = '123';
    const expectResult = {
      user: accountId,
      accessToken: sampleToken.token,
      refreshToken: sampleToken,
      expiresIn: sampleToken.expiresIn,
    };

    expect(authenticationService.getToken(accountId)).toEqual(expectResult);
  });
});
