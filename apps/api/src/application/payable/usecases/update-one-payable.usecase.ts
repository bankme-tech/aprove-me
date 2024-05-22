import { Injectable, Inject } from '@nestjs/common';

import { Payable } from '@bankme/domain';

import { IUpdatePayable } from '@domain/payable/interfaces/update-payable.interface';

import {
  IPayableRepository,
  PAYABLE_REPOSITORY,
} from '@infra/payable/repositories/payable.repository';

@Injectable()
export class UpdateOnePayableUseCase {
  constructor(
    @Inject(PAYABLE_REPOSITORY)
    private readonly _repository: IPayableRepository,
  ) {}

  async update(data: IUpdatePayable, payable: Payable): Promise<Payable> {
    const { emissionDate, ...rest } = data;
    return this._repository.save(
      Payable.fromExisting({
        ...payable,
        ...rest,
        ...(emissionDate && { emissionDate: new Date(emissionDate) }),
      }),
    );
  }
}
