import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

/**Middleware de autenticação. Verifica se há token no header e impede acesso lançando erro de "Não autorizado". */
@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  /**Procura o token no header da requisição, checa se é válido e retorna mensagem de não autorizado caso o token seja inexistente ou inválido. */
  use(req: Request, _res: Response, next: NextFunction) {
    const auth = req.headers.authorization;

    const [, , token] = auth.split(' ');

    const validToken = this.jwtService.verify(token, {
      secret: process.env.JWT_SECRET,
    });

    if (!validToken) {
      throw new UnauthorizedException('Não autorizado. Token Inválido.');
    }
    next();
  }
}
