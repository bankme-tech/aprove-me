import { Inject, Injectable, PipeTransform } from '@nestjs/common';

import { Id } from '@domain/shared/id';
import { IPayable } from '@domain/payable/interfaces/payable.interface';
import { PayableNotFoundException } from '@domain/payable/exceptions/payable-not-found.exception';

import {
  IPayableRepository,
  PAYABLE_REPOSITORY,
} from '@infra/payable/repositories/payable.repository';

@Injectable()
export class PayableByIdPipe
  implements PipeTransform<Id, Promise<IPayable | null>>
{
  constructor(
    @Inject(PAYABLE_REPOSITORY)
    private readonly _repository: IPayableRepository,
  ) {}

  async transform(id: Id): Promise<IPayable | null> {
    return this._findPayableByIdOrThrow(id);
  }

  private async _findPayableByIdOrThrow(id: Id): Promise<IPayable> {
    const user = await this._repository.findOneById(id);
    if (user.isNone()) {
      throw PayableNotFoundException.withId(id);
    }
    return user.value;
  }
}
