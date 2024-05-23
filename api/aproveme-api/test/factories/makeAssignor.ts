import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
  Assignor,
  AssignorProps,
} from "@/domain/receivables/enterprise/entities/assignor";
import { PrismaAssignorMapper } from "@/infra/database/prisma/mappers/prisma-assignor-mapper";
import { PrismaService } from "@/infra/database/prisma/prisma.service";

import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";
import fakerBr from "faker-br";

export const makeAssignor = (
  override: Partial<AssignorProps>,
  id?: UniqueEntityId
) => {
  return Assignor.create(
    {
      document: fakerBr.br.cpf(),
      email: faker.internet.email(),
      name: faker.person.fullName(),
      phone: faker.phone.number(),
      userId: override.userId,
      ...override,
    },
    id
  );
};

@Injectable()
export class AssignorFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaAssignor(
    data: Partial<AssignorProps> = {}
  ): Promise<Assignor> {
    const user = makeAssignor(data);

    await this.prisma.assignor.create({
      data: PrismaAssignorMapper.toPrisma(user),
    });

    return user;
  }
}
