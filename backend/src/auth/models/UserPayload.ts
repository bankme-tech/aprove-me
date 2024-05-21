export interface UserPayload {
  sub: string;
  login: string;
  iat?: number;
  exp?: number;
}
