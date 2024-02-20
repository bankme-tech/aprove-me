import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/base';
import { Receivable } from 'src/domain/entities';
import { ReceivableRepository } from 'src/repositories';

type Output = {
  receivables: Receivable[];
};

@Injectable()
export class FetchAllReceivableUseCase implements UseCase<void, Output> {
  constructor(private readonly receivableRepository: ReceivableRepository) {}

  async execute(): Promise<Output> {
    const receivables = await this.receivableRepository.fetchAll();

    return {
      receivables,
    };
  }
}
