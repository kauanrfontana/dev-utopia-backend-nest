export interface JwtPayload {
  sub: number;
  name: string;
  email: string;
  iat: number;
  exp: number;
}
