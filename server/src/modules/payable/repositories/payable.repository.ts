import { GenericRepository } from '@infra/database/shared/generic-repository';
import { Payable } from '../entities/payable.entity';

export abstract class PayableRepository extends GenericRepository<Payable> {
  abstract findAll(): Promise<Payable[]>;
}
