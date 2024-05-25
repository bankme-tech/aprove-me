import { Payable } from '@prisma/client';
import { IPayableMapper } from './payable.mapper.interface';
import { PayableEntity } from '../entities/payable.entity';
import { UUID } from 'crypto';

export class PrismaPayableMapper extends IPayableMapper<Payable> {
  toDomainEntity(data: Payable): PayableEntity {
    const year = data.emissionDate.getFullYear();
    const month = data.emissionDate.getMonth() + 1;
    const day = data.emissionDate.getDate();
    const emissionDate = new Date(year, month - 1, day);

    return {
      id: data.id as UUID,
      value: data.value,
      assignorId: data.assignorId as UUID,
      emissionDate: emissionDate,
    };
  }

  toPersistenceModel(data: PayableEntity): Payable {
    return {
      id: data.id as string,
      value: data.value,
      assignorId: data.assignorId as string,
      emissionDate: new Date(data.emissionDate),
    };
  }
}
