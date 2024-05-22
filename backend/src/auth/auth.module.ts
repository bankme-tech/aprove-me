import { Module } from '@nestjs/common';
import { AuthService, UserRepository } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
// import { SessionManagerService } from './session-manager.service';
import { AuthGuard } from './auth.guard';
import { SessionModule } from './session/session-manager.module';

@Module({
  imports: [SessionModule],
  providers: [AuthService, UserRepository, PrismaService, AuthGuard],
  controllers: [AuthController],
  // exports: [PrismaService]
  // exports: [SessionManagerService]
})
export class AuthModule {}
