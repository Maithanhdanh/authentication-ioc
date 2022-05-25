enum TokenType {
  ACCESS_TOKEN = 'access_token',
  REFRESH_TOKEN = 'refresh_token',
}

interface AuthToken {
  token: string;
  expiresIn: number;
}

export { TokenType, AuthToken };
