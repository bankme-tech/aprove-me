import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersRepository } from './users.repository';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [UsersService, UsersRepository],
  exports: [UsersService],
  imports: [PrismaModule],
})
export class UsersModule {}