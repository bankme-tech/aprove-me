import { Inject, Injectable } from '@nestjs/common';

import { Payable } from '@bankme/domain';

import { IPage } from '@domain/shared/page.interface';
import { IPageQuery } from '@domain/shared/page-query.interface';

import {
  IPayableRepository,
  PAYABLE_REPOSITORY,
} from '@infra/payable/repositories/payable.repository';

@Injectable()
export class FindPayableUseCase {
  constructor(
    @Inject(PAYABLE_REPOSITORY)
    private readonly _payableRepository: IPayableRepository,
  ) {}

  find(query: IPageQuery): Promise<IPage<Payable>> {
    return this._payableRepository.find(query);
  }
}
