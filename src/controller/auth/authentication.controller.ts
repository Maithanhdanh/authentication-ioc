import { types } from '@config/constants';
import { Request, Response, NextFunction } from 'express';
import { inject } from 'inversify';
import { controller, httpPost, interfaces, next, request, response } from 'inversify-express-utils';
import { GetTokenRequest, GetTokenResponse } from '@controller/auth/type';
import { validateSchema } from 'decorators-utils';
import { AuthenticationService } from '@server/application/auth-service/authentication.service';

export interface AuthenticationController extends interfaces.Controller {
  getToken(req: Request, res: Response, next: NextFunction): Promise<GetTokenResponse | void>;
}

@controller('/auth')
export class AuthenticationControllerImpl implements AuthenticationController {
  constructor(@inject(types.Service.AUTH) private authService: AuthenticationService) {}

  @httpPost('/token')
  public async getToken(
    @request() req: Request,
    @response() _res: Response,
    @next() nextFunc: NextFunction,
  ): Promise<GetTokenResponse | void> {
    try {
      validateSchema(GetTokenRequest, req.body);

      const { accountId } = req.body;

      return await this.authService.getToken(accountId);
    } catch (err) {
      nextFunc(err);
    }
  }
}
