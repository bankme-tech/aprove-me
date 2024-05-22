import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PermissionsService} from '../services/permissions.service'
import { AuthController } from './auth.controller';
import { jwtConstants } from './constants';
import { JwtModule } from '@nestjs/jwt';
import {PrismaService} from '../services/prisma.service'

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1800' }, // trocar para 1800 pq 60s tava muito curto para fazer os testes
    }),
  ],
  providers: [AuthService, PermissionsService, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
