import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [AuthService, UsersService],
})
export class UsersModule {}
