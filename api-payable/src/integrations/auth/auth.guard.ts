import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { TokenService } from './token.service';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private tokenService: TokenService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log("| ----- | ----- | 129873981 29382193 | ----- | ----- | ");
    const req = context.switchToHttp().getRequest();
    console.log(`[Log:req]:`, req);
    const token = this.extractTokenFromHeader(req);
    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const tokenUser = this.tokenService.verifyToken(token);
      req.user = tokenUser;
    } catch {
      throw new UnauthorizedException();
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}

export type ReqAuthorized = Request & { user: IUser };
