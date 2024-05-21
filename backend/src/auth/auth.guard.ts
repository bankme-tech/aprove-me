import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { SessionManagerService } from './session-manager.service';
import { User } from '@prisma/client';

type GuardProps = boolean | Promise<boolean> | Observable<boolean>;

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(readonly sessionManagerService : SessionManagerService){
    this.sessionManagerService = sessionManagerService
  }

  canActivate(context: ExecutionContext): GuardProps {
    const request = context.switchToHttp().getRequest()

    const [name, token] : [string, string] = request.headers['authorization'].split(" ")
    if (name !== "bearer") {
      throw new HttpException("authentication format invalid", HttpStatus.BAD_REQUEST)
    }

    const user : User | null = this.sessionManagerService.getSession(token)

    if (user) {
      request.user = user
      return true
    }
    
    throw new HttpException("User not found", HttpStatus.BAD_REQUEST)
  }
}
