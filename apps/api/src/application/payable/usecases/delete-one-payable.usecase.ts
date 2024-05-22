import { Inject, Injectable } from '@nestjs/common';

import { Payable } from '@bankme/domain';

import {
  IPayableRepository,
  PAYABLE_REPOSITORY,
} from '@infra/payable/repositories/payable.repository';

@Injectable()
export class DeleteOnePayableUseCase {
  constructor(
    @Inject(PAYABLE_REPOSITORY)
    private readonly _repository: IPayableRepository,
  ) {}

  async delete(payable: Payable): Promise<void> {
    await this._repository.delete(payable);
  }
}
