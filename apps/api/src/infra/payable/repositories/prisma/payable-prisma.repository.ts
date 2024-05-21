import { Injectable } from '@nestjs/common';

import { IPayableConstructor, Payable } from '@domain/payable/models/payable';

import { IPayableRepository } from '@infra/payable/repositories/payable.repository';
import { PrismaService } from '@infra/prisma/services/prisma.service';
import { PayableMapper } from '@infra/payable/repositories/prisma/payable.mapper';

@Injectable()
export class PayablePrismaRepository implements IPayableRepository {
  constructor(private readonly _prismaService: PrismaService) {}

  async create(data: Omit<IPayableConstructor, 'id'>): Promise<Payable> {
    const payable = await this._prismaService.payable.create({
      include: { assignor: true },
      data: {
        value: data.value,
        emissionDate: new Date(data.emissionDate),
        assignorId: data.assignor.id,
      },
    });
    return PayableMapper.toDomain(payable);
  }
}
