import { PayablePersistence } from '~/common/types/payable.types';
import { PayableEntity } from '../../entities/payable.entity';
import { IPayableRepository } from '../interfaces/payable.repository-interface';
import { PayableMapper } from '../../mappers/payable.mapper';

export class InMemoryPayableRepository implements IPayableRepository {
  items: PayablePersistence[] = [];

  async create(payable: PayableEntity): Promise<void> {
    const entity = PayableMapper.toPersistence(payable);

    this.items.push(entity);
  }

  async findById(id: string): Promise<PayableEntity | null> {
    const entity = this.items.find((item) => item.id === id);

    if (!entity) return null;

    return PayableMapper.toDomain(entity);
  }
}
