import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { UsersRepository } from "@/domain/account/application/repositories/users-repository";
import { PrismaUsersRepository } from "./repositories/prisma-users-repository";
import { PayablesRepository } from "@/domain/receivables/application/repositories/payables-repository";
import { PrismaPayablesRepository } from "./repositories/prisma-payables-repository";

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
  ],
  exports: [UsersRepository, PayablesRepository],
})
export class DatabaseModule {}
