import { Injectable } from '@nestjs/common';

import { Payable } from '@domain/payable/models/payable';

@Injectable()
export class FindOnePayableUseCase {
  async find(payable: Payable): Promise<Payable> {
    return payable;
  }
}
