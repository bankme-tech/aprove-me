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
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [AuthService, PermissionsService, PrismaService],
  controllers: [AuthController],
})
export class AuthModule {}
