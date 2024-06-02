import { Injectable, NotFoundException } from '@nestjs/common';
import { UseCase } from '@core/shared/contracts/usecases';
import { PayableRepository } from '@core/payable/ports/repository';

@Injectable()
export class DeletePayableUseCase implements UseCase<string, void> {
  constructor(private readonly payableRepository: PayableRepository) {}

  async execute(id: string): Promise<void> {
    const assignor = await this.payableRepository.findById(id);

    if (!assignor) {
      throw new NotFoundException('payable not found');
    }

    await this.payableRepository.delete(id);
  }
}
