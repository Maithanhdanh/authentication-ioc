import { Request, Response, NextFunction } from 'express';
import { controller, interfaces, httpPost, request, response, next, httpGet } from 'inversify-express-utils';
import { GetTokenResponse, GetTokenRequest, VerifyTokenRequest } from '@controller/auth/type';
import { validateSchema } from 'decorators-utils';
import { inject } from 'inversify';
import { types } from '@config/constants';
import { AuthenticationService } from '@application/auth-service/authentication.service';
import { get } from 'lodash';
import { headerPath, HttpStatusCode } from '@common/constant';

export interface AuthenticationController extends interfaces.Controller {
  getToken(req: Request, res: Response, nextFunction: NextFunction): GetTokenResponse | void;
  verifyToken(req: Request, res: Response, nextFunction: NextFunction): boolean | void;
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

  @httpGet('/verify')
  public verifyToken(
    @request() req: Request,
    @response() res: Response,
    @next() nextFunction: NextFunction,
  ): boolean | void {
    try {
      validateSchema(VerifyTokenRequest, req.headers);

      const token = get(req, headerPath.AUTHENTICATION);

      this.authService.verify(token) ? res.sendStatus(HttpStatusCode.OK) : res.sendStatus(HttpStatusCode.UNAUTHORIZED);
    } catch (err) {
      nextFunction(err);
    }
  }
}
