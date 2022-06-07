import { ServiceInfoService, ServiceInfoServiceImpl } from '@application/service-info/serviceInfo.service';
import { types } from '@config/constants';
import { CustomLogger, CustomLoggerImpl } from '@config/customLogger';
import { logger } from '@config/logger';
import { HealthCheckController, HealthCheckControllerImpl } from '@controller/health-check/healthCheck.controller';
import { ServiceInfoController, ServiceInfoControllerImpl } from '@controller/service-info/serviceInfo.controller';
import {
  AuthenticationService,
  AuthenticationServiceImpl,
} from '@server/application/auth-service/authentication.service';
import { getClassNameFromRequest } from '@utils/container';
import { Container, interfaces } from 'inversify';
import { AuthenticationController, AuthenticationControllerImpl } from '../controller/auth/authentication.controller';
import { TokenService, TokenServiceImpl } from '@domain/token/token';

const createContainer = (): Container => {
  logger.debug(`[${createContainer.name}] Register service on Container`);
  const container = new Container();

  container.bind<CustomLogger>(types.Logger).toDynamicValue((context: interfaces.Context) => {
    const namedMetadata = getClassNameFromRequest(context);
    const logger = new CustomLoggerImpl();
    logger.setContext(namedMetadata);
    return logger;
  });

  //Controller
  container.bind<AuthenticationController>(types.Controller.AUTH).to(AuthenticationControllerImpl);
  container.bind<HealthCheckController>(types.Controller.HEALTH_CHECK).to(HealthCheckControllerImpl);
  container.bind<ServiceInfoController>(types.Controller.SERVICE_INFO).to(ServiceInfoControllerImpl);

  //Service
  container.bind<AuthenticationService>(types.Service.AUTH).to(AuthenticationServiceImpl);
  container.bind<ServiceInfoService>(types.Service.SERVICE_INFO).to(ServiceInfoServiceImpl);

  //Domain
  container.bind<TokenService>(types.Domain.TOKEN).to(TokenServiceImpl);

  return container;
};

export { createContainer };
