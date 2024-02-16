import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/base';
import { ReceivableRepository } from 'src/repositories';

type Input = {
  id: string;
  value?: number;
  emission_date?: Date;
  assignor_id?: string;
};

@Injectable()
export class UpdateReceivableUseCase implements UseCase<Input, void> {
  constructor(private readonly receivableRepository: ReceivableRepository) {}

  async execute(input: Input): Promise<void> {
    const receivable = this.receivableRepository.findById(input.id);

    if (!receivable) {
      throw new HttpException('Receivable not found', HttpStatus.NOT_FOUND);
    }

    await this.receivableRepository.update(input.id, input);
  }
}
