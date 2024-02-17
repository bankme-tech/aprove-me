import { Request } from 'express';
import { UserRepository } from '@/database/repositories/user.repository';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { authConfig } from 'src/config/auth';

@Injectable()
export class IsAuthenticated implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
    private userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: authConfig.secret,
      });

      const checkIfUserExists = await this.userRepository.findById(payload.id);

      if (!checkIfUserExists) {
        throw new UnauthorizedException();
      }

      // 💡 We're assigning the payload to the request object here
      // so that we can access it in our route handlers
      request['userId'] = payload.id;
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
