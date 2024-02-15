import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/base';
import { ReceivableRepository } from 'src/repositories';

type Input = {
  id: string;
  value?: number;
  emissionDate?: string;
};

@Injectable()
export class UpdateReceivableUseCase implements UseCase<Input, void> {
  constructor(private readonly receivableRepository: ReceivableRepository) {}

  async execute(input: Input): Promise<void> {}
}
