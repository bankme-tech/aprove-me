import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { ICreatePayable } from '@domain/payable/interfaces/create-payable.interface';

import { CreateOnePayableUseCase } from '@application/payable/usecases/create-one-payable.usecase';

@Controller()
export class PayableController {
  constructor(
    private readonly _createOnePayableUseCase: CreateOnePayableUseCase,
  ) {}

  @EventPattern('payable.create.bulk')
  async getHello(@Payload() payload: ICreatePayable): Promise<void> {
    await this._createOnePayableUseCase.create(payload);
  }
}
