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

  /**Verifica se o token é válido. Se válido, retorna o token decodificado. Se não, impede que o JwtService lance um erro e retorna nulo. */
  async validateToken(token: string): Promise<any> {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded;
    } catch (error) {
      return null;
    }
  }

  /**Procura o token no header da requisição, checa se é válido e retorna mensagem de não autorizado caso o token seja inexistente ou inválido. */
  async use(req: Request, _res: Response, next: NextFunction) {
    const auth = req.headers.authorization;
    if (!auth) {
      throw new UnauthorizedException('Não autorizado.');
    }

    const [, token] = auth.split(' ');

    const validToken = await this.validateToken(token);

    if (!validToken) {
      throw new UnauthorizedException('Não autorizado. Token Inválido.');
    }
    next();
  }
}
