import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

import { Assignor } from "@/domain/receivables/enterprise/entities/assignor";
import { AssignorsRepository } from "@/domain/receivables/application/repositories/assignors-repository";
import { PrismaAssignorMapper } from "../mappers/prisma-assignor-mapper";

@Injectable()
export class PrismaAssignorsRepository implements AssignorsRepository {
  constructor(private prisma: PrismaService) {}

  async create(assignor: Assignor): Promise<void> {
    const data = PrismaAssignorMapper.toPrisma(assignor);

    await this.prisma.assignor.create({
      data,
    });
  }

  async update(assignor: Assignor): Promise<void> {
    const data = PrismaAssignorMapper.toPrisma(assignor);

    await this.prisma.assignor.update({
      where: {
        id: data.id,
      },
      data,
    });
  }

  async delete(assignor: Assignor): Promise<void> {
    const data = PrismaAssignorMapper.toPrisma(assignor);

    await this.prisma.assignor.delete({
      where: {
        id: data.id,
      },
    });
  }

  async findById(id: string): Promise<Assignor> {
    const assignor = await this.prisma.assignor.findUnique({
      where: {
        id,
      },
    });

    if (!assignor) return null;

    return PrismaAssignorMapper.toDomain(assignor);
  }
}
