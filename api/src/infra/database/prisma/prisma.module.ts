import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { PayableRepository } from './payable.repository';
import { AssignorRepository } from './assignor.repository';
import { UsersRepository } from './users.repository';

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
