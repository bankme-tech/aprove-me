import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
  Payable,
  PayableProps,
} from "@/domain/receivables/enterprise/entities/payable";
import { PrismaPayableMapper } from "@/infra/database/prisma/mappers/prisma-payable-mapper";
import { PrismaService } from "@/infra/database/prisma/prisma.service";
import { faker } from "@faker-js/faker";
import { Injectable } from "@nestjs/common";

export const makePayable = (
  override: Partial<PayableProps>,
  id?: UniqueEntityId
) => {
  return Payable.create(
    {
      value: Number(faker.commerce.price()),
      emissionDate: faker.date.anytime(),
      assignorId: new UniqueEntityId(),
      ...override,
    },
    id
  );
};

@Injectable()
export class PayableFactory {
  constructor(private prisma: PrismaService) {}

  async makePrismaPayable(data: Partial<PayableProps> = {}): Promise<Payable> {
    const user = makePayable(data);

    await this.prisma.payable.create({
      data: PrismaPayableMapper.toPrisma(user),
    });

    return user;
  }
}
