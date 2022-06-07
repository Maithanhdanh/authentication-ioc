const headerPath = {
  AUTHENTICATION: 'headers.authorization',
};

enum HttpStatusCode {
  OK = 200,
  UNAUTHORIZED = 403,
  INTERNAL_SERVER_ERROR = 500,
}

export { headerPath, HttpStatusCode };
