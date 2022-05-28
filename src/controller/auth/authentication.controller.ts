import { Request, Response, NextFunction } from 'express';
import { controller, interfaces, httpPost, request, response, next } from 'inversify-express-utils';
import { GetTokenResponse, GetTokenRequest } from '@controller/auth/type';
import { validateSchema } from 'decorators-utils';
import { inject } from 'inversify';
import { types } from '@config/constants';
import { AuthenticationService } from '@application/auth-service/authentication.service';

export interface AuthenticationController extends interfaces.Controller {
  getToken(req: Request, res: Response, nextFunction: NextFunction): GetTokenResponse | void;
}

@controller('/auth')
export class AuthenticationControllerImpl implements AuthenticationController {
  constructor(@inject(types.Service.AUTH) private authService: AuthenticationService) {}

  @httpPost('/token')
  public getToken(
    @request() req: Request,
    @response() _res: Response,
    @next() nextFunction: NextFunction,
  ): GetTokenResponse | void {
    try {
      validateSchema(GetTokenRequest, req.body);

      const { accountId } = req.body;

      return this.authService.getToken(accountId);
    } catch (err) {
      nextFunction(err);
    }
  }
}
