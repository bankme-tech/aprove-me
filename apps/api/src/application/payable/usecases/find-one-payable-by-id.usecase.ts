import { Injectable } from '@nestjs/common';

import { Payable } from '@bankme/domain';

@Injectable()
export class FindOnePayableUseCase {
  async find(payable: Payable): Promise<Payable> {
    return payable;
  }
}
