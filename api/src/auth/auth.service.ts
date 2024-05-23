import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthEntity } from "./entity/auth.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private readonly jwtService: JwtService) {}

  async login(email: string, password: string) : Promise<AuthEntity> {
    const user = await this.prisma.user.findUnique({ where: { email: email } });

    if (!user) {
        throw new NotFoundException(`Não foi encontrado usuário com o email: ${email}`);
      }

    const isPasswordValid = await bcrypt.compare(password, user.password);
      
      if (!isPasswordValid) {
        throw new UnauthorizedException('Senha inválida');
      }

      const jwtPayload = { id: user.id,};
      const token = await this.jwtService.sign(jwtPayload);
      console.log(token);
      return { accessToken: token};
    }
}