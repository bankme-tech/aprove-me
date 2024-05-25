import { Payable } from '@prisma/client';
import { IPayableMapper } from './payable.mapper.interface';
import { PayableEntity } from '../entities/payable.entity';
import { UUID } from 'crypto';

export class PrismaPayableMapper extends IPayableMapper<Payable> {
  toDomainEntity(data: Payable): PayableEntity {
    return new PayableEntity(
      data.id as UUID,
      data.value,
      data.emissionDate,
      data.assignorId as UUID,
    );
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
