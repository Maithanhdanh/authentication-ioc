import supertest from 'supertest';
import { createContainer } from '@config/container';
import { AuthenticationServiceImpl } from '@application/auth-service/authentication.service';
import { startServer } from '@config/express';

describe('Authentication controller', () => {
  let agent: any;
  const container = createContainer();
  const app = startServer(container);

  beforeAll(() => {
    agent = supertest.agent(app);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  afterAll(() => {
    app.close();
  });

  describe('getToken', () => {
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

    it('should throw error when missing accountId', (done) => {
      agent
        .post('/auth/token')
        .set('Content-type', 'application/json')
        .expect({ message: 'accountId must not be null' }, done);
    });
  });

  describe('verifyToken', () => {
    it('should return status code 200 when valid token', () => {
      jest.spyOn(AuthenticationServiceImpl.prototype, 'verify').mockReturnValue(true);

      agent.get('/auth/verify').set('Authorization', 'Bearer sampleToken').expect(200);
    });

    it('should return status code 403 when invalid token', () => {
      jest.spyOn(AuthenticationServiceImpl.prototype, 'verify').mockReturnValue(false);

      agent.get('/auth/verify').set('Authorization', 'Bearer sampleToken').expect(403);
    });

    it('should throw error when missing authorization token', (done) => {
      agent.get('/auth/verify').expect({ message: 'Missing authorization token' }, done);
    });

    it('should throw error when authorization token not start with Bearer', (done) => {
      agent
        .get('/auth/verify')
        .set('Authorization', 'sampleToken')
        .expect({ message: 'token must be start with Bearer' }, done);
    });
  });
});
