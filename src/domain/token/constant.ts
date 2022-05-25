import { TokenType } from '@domain/token/type';

const expiresInString = {
  [TokenType.ACCESS_TOKEN] : '15m',
  [TokenType.REFRESH_TOKEN] : '2d',
}

const expiresInNumber = {
  [TokenType.ACCESS_TOKEN] : 15 * 60000,
  [TokenType.REFRESH_TOKEN] : 24 * 60 * 60000,
}

export { expiresInString, expiresInNumber };
