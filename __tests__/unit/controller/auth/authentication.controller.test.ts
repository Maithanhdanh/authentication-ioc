import supertest from 'supertest';
import { createContainer } from '@config/container';
import { AuthenticationServiceImpl } from '@application/auth-service/authentication.service';
import { startServer } from '@config/express';

describe('Authentication controller', () => {
  let agent: any;
  beforeAll(() => {
    const container = createContainer();
    const app = startServer(container);
    agent = supertest.agent(app);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return token', (done) => {
    const expectedToken = {
      user: '123',
      accessToken: 'token',
      refreshToken: {
        token: 'sample',
        expiresIn: 123,
      },
      expiresIn: 123,
    };

    jest.spyOn(AuthenticationServiceImpl.prototype, 'getToken').mockReturnValue(expectedToken);

    agent
      .post('/auth/token')
      .set('Content-type', 'application/json')
      .send({ accountId: '123' })
      .expect(expectedToken, done);
  });
});
