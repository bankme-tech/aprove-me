import { UsersRepository } from "@/domain/account/application/repositories/users-repository";
import { User } from "@/domain/account/enterprise/entities/user";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";
import { PrismaUserMapper } from "../mappers/prisma-user-mapper";

@Injectable()
export class PrismaUsersRepository implements UsersRepository {
  constructor(private prisma: PrismaService) {}

  async create(user: User): Promise<void> {
    const data = PrismaUserMapper.toPrisma(user);

    await this.prisma.user.create({
      data,
    });
  }

  async findByLogin(login: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: {
        login,
      },
    });

    if (!user) return null;

    return PrismaUserMapper.toDomain(user);
  }
}
