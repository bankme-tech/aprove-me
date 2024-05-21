import { Module } from "@nestjs/common";
import { PrismaService } from "./prisma.service";
import { UsersRepository } from "@/domain/account/application/repositories/users-repository";
import { PrismaUsersRepository } from "./repositories/prisma-users-repository";

@Module({
  providers: [
    PrismaService,
    {
      provide: UsersRepository,
      useClass: PrismaUsersRepository,
    },
  ],
  exports: [UsersRepository],
})
export class DatabaseModule {}
