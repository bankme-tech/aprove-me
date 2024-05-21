import { Inject, Injectable } from '@nestjs/common';

import { ICreatePayable } from '@domain/payable/interfaces/create-payable.interface';
import { Payable } from '@bankme/domain';

import {
  ASSIGNOR_REPOSITORY,
  IAssignorRepository,
} from '@infra/assignor/repositories/assignor.repository';
import {
  IPayableRepository,
  PAYABLE_REPOSITORY,
} from '@infra/payable/repositories/payable.repository';

@Injectable()
export class CreateOnePayableUseCase {
  constructor(
    @Inject(PAYABLE_REPOSITORY)
    private readonly _payableRepository: IPayableRepository,
    @Inject(ASSIGNOR_REPOSITORY)
    private readonly _assignorRepository: IAssignorRepository,
  ) {}

  async create(data: ICreatePayable): Promise<Payable> {
    const assignor = await this._assignorRepository.create({
      document: data.assignor.document,
      email: data.assignor.email,
      name: data.assignor.name,
      phone: data.assignor.phone,
    });
    const payable = await this._payableRepository.create({
      value: data.value,
      emissionDate: data.emissionDate,
      assignor,
    });
    return payable;
  }
}
