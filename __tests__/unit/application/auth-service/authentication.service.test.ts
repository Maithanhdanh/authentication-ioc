import { createContainer } from '@config/container';
import { types } from '@config/constants';
import { TokenServiceImpl } from '@server/domain/token/token';
import { sampleToken } from '@tests/fixtures/token';
import { AuthenticationService } from '@application/auth-service/authentication.service';
import { decrypt } from '@utils/encryption';
import jwt from 'jsonwebtoken';

jest.mock('@utils/encryption');
jest.mock('jsonwebtoken');

describe('Authentication Service', () => {
  let authenticationService: AuthenticationService;

  beforeEach(() => {
    const container = createContainer();
    authenticationService = container.get<AuthenticationService>(types.Service.AUTH);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('getToken', () => {
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

  describe('verify', () => {
    beforeEach(() => {
      (decrypt as jest.Mock).mockReturnValue('validToken');
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    it('should return true when valid token', () => {
      (jwt.verify as jest.Mock).mockReturnValue('');
      expect(authenticationService.verify('sampleToken')).toBeTruthy();
    });

    it('should return false when invalid token', () => {
      (jwt.verify as jest.Mock).mockImplementation(() => {
        throw new Error('Invalid token');
      });
      expect(authenticationService.verify('sampleToken')).toBeFalsy();
    });
  });
});
