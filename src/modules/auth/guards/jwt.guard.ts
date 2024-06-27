import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const route = request.route.path;
    if (
      route.startsWith('/login') ||
      (route.startsWith('/users') && request.method == 'POST')
    ) {
      return true;
    }
    return super.canActivate(context);
  }
}
