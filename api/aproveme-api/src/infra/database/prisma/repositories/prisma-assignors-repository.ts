import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma.service";

import { Assignor } from "@/domain/receivables/enterprise/entities/assignor";
import { AssignorsRepository } from "@/domain/receivables/application/repositories/assignors-repository";
import { PrismaAssignorMapper } from "../mappers/prisma-assignor-mapper";
import { AssignorName } from "@/domain/receivables/enterprise/entities/value-object/assignor-name";
import { PrismaAssignorNameMapper } from "../mappers/prisma-assignor-name-mapper";

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

  async findByDocument(document: string): Promise<Assignor> {
    const assignor = await this.prisma.assignor.findUnique({
      where: {
        document,
      },
    });

    if (!assignor) return null;

    return PrismaAssignorMapper.toDomain(assignor);
  }

  async findByEmail(email: string): Promise<Assignor> {
    const assignor = await this.prisma.assignor.findUnique({
      where: {
        email,
      },
    });

    if (!assignor) return null;

    return PrismaAssignorMapper.toDomain(assignor);
  }

  async findManyNames(): Promise<AssignorName[]> {
    const assignors = await this.prisma.assignor.findMany();

    return assignors.map(PrismaAssignorNameMapper.toDomain);
  }
}
