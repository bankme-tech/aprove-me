import { Assignor } from '@/app/entities/assignor';
import { AssignorRepository } from '@/app/repositories/assignor.repository';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { PrismaAssignorMapper } from '@/infra/database/prisma/mappers/assignor';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaAssignorRepository implements AssignorRepository {
  constructor(private db: PrismaService) { }

  public async create(assignor: Assignor): Promise<Assignor> {
    const rawData = PrismaAssignorMapper.toPrisma(assignor);
    const newAssignor = await this.db.assignor.create({
      data: rawData,
    });

    return PrismaAssignorMapper.toDomain(newAssignor);
  }

  public async findById(assignorId: string): Promise<Assignor | null> {
    const assignor = await this.db.assignor.findFirst({
      where: { id: assignorId },
    });

    if (!assignor) return null;

    return PrismaAssignorMapper.toDomain(assignor);
  }

  public async findByEmail(assignorEmail: string): Promise<Assignor | null> {
    const assignor = await this.db.assignor.findFirst({
      where: { email: assignorEmail },
    });

    if (!assignor) return null;

    return PrismaAssignorMapper.toDomain(assignor);
  }
}
