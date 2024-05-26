import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus } from '@nestjs/common';
import { User } from '@prisma/client';
import { SessionManagerService } from './session/session-manager.service';
// import { SessionManagerService } from './session-manager.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly sessionManager: SessionManagerService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();

    const authorizationHeader = request.headers['authorization'];
    if (!authorizationHeader) {
      throw new HttpException('Authorization header missing', HttpStatus.BAD_REQUEST);
    }

    const [name, token] = authorizationHeader.split(' ');
    if (name !== 'Bearer') {
      throw new HttpException('Authentication format invalid', HttpStatus.BAD_REQUEST);
    }

    const user: any = this.sessionManager.getSession(token);
    if (user) {
      request.user = user;
      return true;
    }

    throw new HttpException('Not Authorized. Session expired or invalid token. Total sessions: ' + this.sessionManager.getAllSessions(), HttpStatus.UNAUTHORIZED);
  }
}
