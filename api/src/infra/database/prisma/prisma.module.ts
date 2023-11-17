import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PayableRepository } from '../repositories/payable.repository';
import { AssignorRepository } from '../repositories/assignor.repository';
import { UsersRepository } from '../repositories/users.repository';

@Module({
  providers: [
    PrismaService,
    PayableRepository,
    AssignorRepository,
    UsersRepository,
  ],
  exports: [PayableRepository, AssignorRepository, UsersRepository],
})
export class PrismaModule {}
