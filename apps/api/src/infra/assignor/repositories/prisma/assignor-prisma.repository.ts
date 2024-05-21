import { Injectable } from '@nestjs/common';

import {
  Assignor,
  IAssignorConstructor,
} from '@domain/assignor/models/assignor';

import { PrismaService } from '@infra/prisma/services/prisma.service';
import { IAssignorRepository } from '@infra/assignor/repositories/assignor.repository';
import { AssignorMapper } from '@infra/assignor/repositories/prisma/assignor.mapper';

@Injectable()
export class AssignorPrismaRepository implements IAssignorRepository {
  constructor(private readonly _prismaService: PrismaService) {}

  async create(data: Omit<IAssignorConstructor, 'id'>): Promise<Assignor> {
    const assignor = await this._prismaService.assignor.create({
      data: {
        document: data.document,
        name: data.name,
        email: data.email,
        phone: data.phone,
      },
    });
    return AssignorMapper.toDomain(assignor);
  }
}
