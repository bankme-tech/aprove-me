import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

import { ICreatePayable } from '@domain/payable/interfaces/create-payable.interface';

@Injectable()
export class CreateBulkPayableUseCase {
  constructor(
    @Inject('BULK_PAYABLE_SERVICE')
    private readonly _client: ClientProxy,
  ) {}

  async create(dtos: ICreatePayable[]): Promise<void> {
    for (const dto of dtos) {
      this._client.emit('payable.create.bulk', dto);
    }
  }
}
