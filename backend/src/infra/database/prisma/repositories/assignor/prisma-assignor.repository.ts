import { Injectable } from '@nestjs/common';
import { Assignor } from '@core/assignor/model';
import { PrismaService } from '@infra/database/prisma/services';
import { AssignorRepository } from '@core/assignor/ports/repository';
import { PrismAssignorMapper } from '../../mappers/assignor';

@Injectable()
export class PrismaAssignorRepository implements AssignorRepository {
  constructor(private prisma: PrismaService) {}

  async findById(id: string): Promise<Assignor> {
    const foundAssignor = await this.prisma.assignor.findUnique({
      where: { id },
    });

    if (!foundAssignor) return null;

    return PrismAssignorMapper.toDomain(foundAssignor);
  }

  async save(assignor: Assignor): Promise<void> {
    await this.prisma.assignor.upsert({
      where: { id: assignor.id },
      update: {
        name: assignor.name,
        phone: assignor.phone,
        email: assignor.email,
        document: assignor.document,
      },
      create: {
        id: assignor.id,
        name: assignor.name,
        phone: assignor.phone,
        email: assignor.email,
        document: assignor.document,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.assignor.delete({ where: { id } });
  }
}
