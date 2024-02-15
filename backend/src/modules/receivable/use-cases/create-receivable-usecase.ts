import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/base';
import { CreateReceivableDto } from 'src/domain/dtos';
import { Receivable } from 'src/domain/entities';
import { ReceivableRepository } from 'src/repositories';

type Output = {
  receivable: Receivable;
};

@Injectable()
export class CreateReceivableUseCase
  implements UseCase<CreateReceivableDto, Output>
{
  constructor(private readonly receivableRepository: ReceivableRepository) {}

  async execute(input: CreateReceivableDto): Promise<Output> {
    const receivable = await this.receivableRepository.create(input);

    return {
      receivable,
    };
  }
}
