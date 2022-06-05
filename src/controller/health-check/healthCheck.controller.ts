import { controller, httpHead, interfaces } from 'inversify-express-utils';

export interface HealthCheckController extends interfaces.Controller {
  checkHealth(): string;
}

@controller('/')
export class HealthCheckControllerImpl implements HealthCheckController {
  @httpHead('health')
  public checkHealth(): string {
    return 'UP';
  }
}
