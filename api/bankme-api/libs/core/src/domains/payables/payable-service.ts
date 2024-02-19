import { IPayableDomainService } from './interfaces/payable-service.interface';
import { Payable } from './entities/payable.entity';
import { PayableVO } from './vos/payable.vo';
import { Fails } from 'bme/core/messages/fails';
import { Inject, Injectable } from '@nestjs/common';
import { IPayableRepository } from './interfaces/payable-repository.interface';
import { PayableRepository } from 'bme/core/infra/database/repositories/payable-repository';

@Injectable()
export class PayableDomainService implements IPayableDomainService {
  constructor(
    @Inject(PayableRepository)
    private repository: IPayableRepository,
  ) {}
  async create(data: PayableVO): Promise<Payable | string> {
    const validationError = data.isValid();

    if (!!validationError) return Fails.INVALID_BODY;

    const createData = new Payable();
    createData.id = data.id;
    createData.value = data.value;
    createData.emissionDate = data.emissionDate;
    createData.assignorId = data.assignorId;

    return await this.repository.create(createData);
  }
  changeById(id: string, data: PayableVO): Promise<Payable> {
    throw new Error('Method not implemented.');
  }
  removeById(id: string): Promise<PayableVO> {
    throw new Error('Method not implemented.');
  }
}
