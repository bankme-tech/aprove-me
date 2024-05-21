import { Module } from '@nestjs/common';
import { AuthService, UserRepository } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { SessionManagerService } from './session-manager.service';
import { AuthGuard } from './auth.guard';

@Module({
  providers: [AuthService, UserRepository, PrismaService, AuthGuard, SessionManagerService],
  controllers: [AuthController],
  // exports: [PrismaService]
  // exports: [SessionManagerService]
})
export class AuthModule {}
