import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

import { Payable } from "@/domain/receivables/enterprise/entities/payable";
import { PayableWithAssignor } from "@/domain/receivables/enterprise/entities/value-object/payable-with-assignor";
import { PayablesRepository } from "@/domain/receivables/application/repositories/payables-repository";
import { PrismaPayableMapper } from "../mappers/prisma-payable-mapper";
import { PrismaPayableWithAssignorMapper } from "../mappers/prisma-payable-with-assignor-mapper";
import { PaginationParams } from "@/core/repositories/pagination-params";

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

  async findManyPaginated({ page }: PaginationParams): Promise<Payable[]> {
    const payables = await this.prisma.payable.findMany({
      take: 5,
      skip: (page - 1) * 20,
    });

    return payables.map(PrismaPayableMapper.toDomain);
  }
}
