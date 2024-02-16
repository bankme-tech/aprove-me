import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/base';
import { Receivable } from 'src/domain/entities';
import { ReceivableRepository } from 'src/repositories';

type Output = {
  receivable: Receivable;
};

@Injectable()
export class FindReceivableByIdUseCase implements UseCase<string, Output> {
  constructor(private readonly receivableRepository: ReceivableRepository) {}

  async execute(input: string): Promise<Output> {
    const receivable = await this.receivableRepository.findById(input);

    if (!receivable) {
      throw new HttpException('Receivable not found', HttpStatus.NOT_FOUND);
    }

    return {
      receivable,
    };
  }
}
