import { Injectable } from '@nestjs/common';

import { IOption, toOption } from '@bankme/monads';

import { Assignor, IAssignorConstructor } from '@bankme/domain';

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

  async save(data: Assignor): Promise<Assignor> {
    const assignor = await this._prismaService.assignor.update({
      where: { id: data.id },
      data: AssignorMapper.toPrisma(data),
    });
    return AssignorMapper.toDomain(assignor);
  }

  async findOneById(id: string): Promise<IOption<Assignor>> {
    const user = await this._prismaService.assignor.findFirst({
      where: { id },
    });
    return toOption(user).map(AssignorMapper.toDomain);
  }
}
