import { Injectable, NotFoundException } from '@nestjs/common';
import { Payable } from '@core/payable/model';
import { UseCase } from '@core/shared/contracts/usecases';
import { PayableRepository } from '@core/payable/ports/repository';

@Injectable()
export class GetPayableUseCase implements UseCase<string, Payable | null> {
  constructor(private readonly payableRepository: PayableRepository) {}

  async execute(id: string): Promise<Payable | null> {
    const payable = await this.payableRepository.findById(id);

    if (!payable) {
      throw new NotFoundException('Assignor not found');
    }

    return payable;
  }
}
