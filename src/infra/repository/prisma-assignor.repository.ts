import { PrismaClient } from '@prisma/client';

import { AssignorEntity } from '../../domain/entity';
import { IAssignorRepository } from '../../domain/repository';
import { assign } from 'lodash';

export class PrismaAssignorRepository implements IAssignorRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async add(entity: AssignorEntity): Promise<void> {
    await this.prisma.assignor.create({
      data: {
        id: entity.id.value,
        document: entity.document.value,
        email: entity.email.value,
        phone: entity.phone.value,
        name: entity.name,
      },
    });
  }

  async findByDocument(document: string): Promise<AssignorEntity | null> {
    const assignor = await this.prisma.assignor.findUnique({
      where: { document },
      include: { receivables: true },
    });

    return assignor ? new AssignorEntity({ ...assignor }) : null;
  }

  async findById(id: string): Promise<AssignorEntity | null> {
    const result = await this.prisma.assignor.findUnique({
      where: { id },
      include: { receivables: true },
    });

    return result ? new AssignorEntity({ ...result }) : null;
  }
}
