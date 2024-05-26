import { InMemoryRepository } from '@/core/domain/respositories/in-memory.repository';
import { Payable } from '../../entities/payable.entity';
import { PayablesRepository } from '../payables.repository';

export class InMemoryPayablesRepository
  extends InMemoryRepository<Payable>
  implements PayablesRepository {}
