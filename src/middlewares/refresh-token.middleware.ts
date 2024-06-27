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
    const oldRefreshToken = req.headers['x-refresh-token'];
    if (!oldRefreshToken) {
      throw new UnauthorizedException();
    }
    const oldToken = req.headers['x-auth-token'];
    const newTokens = await this.authService.refreshToken(
      oldRefreshToken as string,
    );
    if (!newTokens) {
      res.setHeader('X-Refresh-Token', newTokens.refreshToken);
      res.setHeader('X-Auth-Token', newTokens.token);
    } else {
      res.setHeader('X-Refresh-Token', oldRefreshToken);
      res.setHeader('X-Auth-Token', oldToken);
    }
    next();
  }
}
