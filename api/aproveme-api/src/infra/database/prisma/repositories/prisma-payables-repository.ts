import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

import { Payable } from "@/domain/receivables/enterprise/entities/payable";
import { PayableWithAssignor } from "@/domain/receivables/enterprise/entities/value-object/receivable-with-assignor";
import { PayablesRepository } from "@/domain/receivables/application/repositories/payables-repository";
import { PrismaPayableMapper } from "../mappers/prisma-payable-mapper";
import { PrismaPayableWithAssignorMapper } from "../mappers/prisma-payable-with-assignor-mapper";

@Injectable()
export class PrismaPayablesRepository implements PayablesRepository {
  constructor(private prisma: PrismaService) {}

  async create(payable: Payable): Promise<void> {
    const data = PrismaPayableMapper.toPrisma(payable);

    await this.prisma.payable.create({
      data,
    });
  }

  async update(payable: Payable): Promise<void> {
    const data = PrismaPayableMapper.toPrisma(payable);

    await this.prisma.payable.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  async delete(payable: Payable): Promise<void> {
    const data = PrismaPayableMapper.toPrisma(payable);

    await this.prisma.payable.delete({
      where: {
        id: data.id,
      },
    });
  }

  async findByid(id: string): Promise<Payable> {
    const payable = await this.prisma.payable.findUnique({
      where: {
        id,
      },
    });

    if (!payable) return null;

    return PrismaPayableMapper.toDomain(payable);
  }

  async findWithAssignorById(id: string): Promise<PayableWithAssignor> {
    const payable = await this.prisma.payable.findUnique({
      where: {
        id,
      },
      include: {
        assignor: true,
      },
    });

    if (!payable) return null;

    const payableWithAssignor =
      PrismaPayableWithAssignorMapper.toDomain(payable);

    return payableWithAssignor;
  }
}
