import { IPayable } from '@domain/payable/interfaces/payable.interface';
import { Payable } from '@domain/payable/models/payable';

import { AssignorMapper } from '@infra/assignor/repositories/prisma/assignor.mapper';

import {
  Payable as PrismaPayable,
  Assignor as PrismaAssignor,
} from '@prisma/client';

export class PayableMapper {
  static toPrisma(data: IPayable): PrismaPayable {
    return {
      id: data.id,
      value: data.value,
      emissionDate: data.emissionDate,
      assignorId: data.assignor.id,
    };
  }

  static toDomain(data: PrismaPayable & { assignor: PrismaAssignor }): Payable {
    return Payable.fromData({
      id: data.id,
      value: data.value,
      emissionDate: data.emissionDate,
      assignor: AssignorMapper.toDomain(data.assignor),
    });
  }
}
