import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException,
  } from '@nestjs/common';
  import { JwtService } from '@nestjs/jwt';
  import { Request } from 'express';
import { jwtSecret } from './auth.module';
  
  @Injectable()
  export class RolesGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const token = this.extractTokenFromHeader(request);
  
      if (!token) {
        throw new UnauthorizedException('Token não encontrado');
      }
  
      try {
        const payload = await this.jwtService.verifyAsync(token, {
          secret: jwtSecret,
        });
  
        request['id'] = payload.id;
      } catch (error) {
       
        throw new UnauthorizedException('Sessão Expirada');
      }
  
      return true;
    }
  
    private extractTokenFromHeader(request: Request): string | undefined {
      const [type, token] = request.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer' ? token : undefined;
    }
  }
  