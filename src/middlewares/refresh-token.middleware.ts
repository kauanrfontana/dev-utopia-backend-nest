import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from 'src/modules/auth/auth.service';

@Injectable()
export class RefreshTokenMiddleware implements NestMiddleware {
  constructor(private authService: AuthService) {}
  async use(req: Request, res: Response, next: (error?: any) => void) {
    const oldToken = req.headers['x-auth-token'];
    const oldRefreshToken = req.headers['x-refresh-token'];

    if (!oldRefreshToken) {
      throw new UnauthorizedException();
    }

    const isTokenExpired = this.authService.isTokenExpired(oldToken as string);

    if (!isTokenExpired) {
      res.setHeader('X-Refresh-Token', oldRefreshToken);
      res.setHeader('X-Auth-Token', oldToken);
      next();
      return;
    }

    const newTokens = await this.authService.refreshToken(
      oldRefreshToken as string,
    );

    if (!newTokens) {
      throw new UnauthorizedException();
    }

    res.setHeader('X-Refresh-Token', newTokens.refreshToken);
    res.setHeader('X-Auth-Token', newTokens.token);

    next();
  }
}
