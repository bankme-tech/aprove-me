import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { ICreatePayable } from '@domain/payable/interfaces/create-payable.interface';

import { CreateOnePayableUseCase } from '@application/payable/usecases/create-one-payable.usecase';

@Controller()
export class PayableController {
  constructor(
    private readonly _createOnePayableUseCase: CreateOnePayableUseCase,
  ) {}

  @EventPattern('payable.create.bulk.start')
  async startCreateBulk(): Promise<void> {
    // Create a record to save the results
  }

  @EventPattern('payable.create.bulk')
  async createBulk(@Payload() payload: ICreatePayable): Promise<void> {
    await this._createOnePayableUseCase.create(payload);
  }

  @EventPattern('payable.create.bulk.end')
  async endCreateBulk(): Promise<void> {
    // Send the email
  }
}
