import { Injectable } from '@nestjs/common';

import { IOption, toOption } from '@bankme/monads';

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

  async save(data: Payable): Promise<Payable> {
    const payable = await this._prismaService.payable.update({
      include: { assignor: true },
      where: { id: data.id },
      data: {
        value: data.value,
        emissionDate: data.emissionDate,
      },
    });
    return PayableMapper.toDomain(payable);
  }

  async findOneById(id: string): Promise<IOption<Payable>> {
    const user = await this._prismaService.payable.findFirst({
      include: { assignor: true },
      where: { id },
    });
    return toOption(user).map(PayableMapper.toDomain);
  }
}
