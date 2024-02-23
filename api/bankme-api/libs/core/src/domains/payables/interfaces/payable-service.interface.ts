import { IErrorDomainService } from 'bme/core/infra/errors/error-domain-service.interface';
import { Payable } from '../entities/payable.entity';
import { PayableVO } from '../vos/payable.vo';

export interface IPayableDomainService extends IErrorDomainService {
  validate(data: PayableVO): Promise<boolean>;
  create(data: PayableVO): Promise<Payable>;
  removeById(id: string): Promise<PayableVO>;
  getAll(): Promise<PayableVO[]>;
  getById(id: string): Promise<PayableVO>;
}
