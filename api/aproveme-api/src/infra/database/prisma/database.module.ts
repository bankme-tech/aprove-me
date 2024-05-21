import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { UsersRepository } from "@/domain/account/application/repositories/users-repository";
import { PrismaUsersRepository } from "./repositories/prisma-users-repository";
import { PayablesRepository } from "@/domain/receivables/application/repositories/payables-repository";
import { PrismaPayablesRepository } from "./repositories/prisma-payables-repository";
import { AssignorsRepository } from "@/domain/receivables/application/repositories/assignors-repository";
import { PrismaAssignorsRepository } from "./repositories/prisma-assignors-repository";

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
    {
      provide: PayablesRepository,
      useClass: PrismaPayablesRepository,
    },
    {
      provide: AssignorsRepository,
      useClass: PrismaAssignorsRepository,
    },
  ],
  exports: [UsersRepository, PayablesRepository, AssignorsRepository],
})
export class DatabaseModule {}
