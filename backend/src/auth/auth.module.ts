import { Module } from '@nestjs/common';
import { AuthService, UserRepository } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [AuthService, UserRepository, PrismaService],
  controllers: [AuthController],
  // exports: [PrismaService]
})
export class AuthModule {}
