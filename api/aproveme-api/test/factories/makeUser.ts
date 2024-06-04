import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { User, UserProps } from "@/domain/account/enterprise/entities/user";
import { PrismaUserMapper } from "@/infra/database/prisma/mappers/prisma-user-mapper";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";

export const makeUser = (override: Partial<UserProps>, id?: UniqueEntityId) => {
  return User.create(
    {
      login: faker.internet.userName(),
      password: faker.internet.password(),
      ...override,
    },
    id
  );
};

@Injectable()
export class UserFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaUser(data: Partial<UserProps> = {}): Promise<User> {
    const user = makeUser(data);

    await this.prisma.user.create({
      data: PrismaUserMapper.toPrisma(user),
    });

    return user;
  }
}
