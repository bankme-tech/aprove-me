import { Module } from '@nestjs/common';

import { USER_REPOSITORY } from '@infra/user/repositories/user.repository';
import { UserPrismaRepository } from '@infra/user/repositories/prisma/user-prisma.repository';

@Module({
  providers: [
    {
      provide: USER_REPOSITORY,
      useClass: UserPrismaRepository,
    },
  ],
  exports: [USER_REPOSITORY],
})
export class UserInfraModule {}
