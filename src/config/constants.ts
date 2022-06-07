const types = {
  Logger: Symbol.for('Logger'),
  Controller: {
    AUTH: Symbol.for('AuthController'),
    HEALTH_CHECK: Symbol.for('HealthCheckController'),
    SERVICE_INFO: Symbol.for('ServiceInfoController'),
  },
  Service: {
    AUTH: Symbol.for('AuthService'),
    SERVICE_INFO: Symbol.for('ServiceInfoService'),
  },
  Domain: {
    TOKEN: Symbol.for('Token'),
  },
};

const reflectMetadataKeys = {
  CLASS_NAME: 'className',
  METHOD_NAME: 'methodName',
};

export { types, reflectMetadataKeys };
