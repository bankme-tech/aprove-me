import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AssignorRepository } from '@modules/assignor/repositories/assignor.repository';
import { PrismaAssignorMapper } from '../mappers/prisma-assignor.mapper';
import { Assignor } from '@modules/assignor/entities/assignor.entity';

@Injectable()
export class PrismaAssignorRepository implements AssignorRepository {
  constructor(private prisma: PrismaService) {}

  async delete(itemId: string): Promise<void> {
    this.prisma.assignor.delete({ where: { id: itemId } });
  }

  async create(item: Assignor): Promise<void> {
    const data = PrismaAssignorMapper.toPrisma(item);

    await this.prisma.assignor.create({ data });
  }

  async save(item: Assignor): Promise<void> {
    const data = PrismaAssignorMapper.toPrisma(item);

    await this.prisma.assignor.update({
      where: { id: item.id },
      data,
    });
  }

  async findByDocument(document: string): Promise<Assignor | null> {
    const assignor = await this.prisma.assignor.findFirst({
      where: { document },
      include: { payables: true },
    });

    if (!assignor) {
      return null;
    }

    return PrismaAssignorMapper.toDomain(assignor);
  }

  async findByEmailOrDocument(
    email?: string,
    document?: string,
  ): Promise<Assignor | null> {
    const entity = this.prisma.assignor.findFirst({
      where: {
        OR: [
          { email: email || undefined },
          { document: document || undefined },
        ],
      },
    });

    if (!entity) {
      return null;
    }

    return PrismaAssignorMapper.toDomain(entity as unknown as Assignor);
  }

  async findByEmail(email: string): Promise<Assignor | null> {
    const assignor = await this.prisma.assignor.findFirst({
      where: { email },
      include: { payables: true },
    });

    if (!assignor) {
      return null;
    }

    return PrismaAssignorMapper.toDomain(assignor);
  }

  async findById(id: string): Promise<Assignor | null> {
    const assignor = await this.prisma.assignor.findUnique({
      where: { id },
      include: { payables: true },
    });

    console.log(assignor);

    if (!assignor) {
      return null;
    }

    return PrismaAssignorMapper.toDomain(assignor, assignor.payables);
  }

  async findAll(): Promise<Assignor[]> {
    const assignors = await this.prisma.assignor.findMany({
      include: { payables: true },
    });

    return assignors.map((assignor) => PrismaAssignorMapper.toDomain(assignor));
  }
}
