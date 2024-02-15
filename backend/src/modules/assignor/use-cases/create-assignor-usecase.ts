import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/base';
import { CreateAssignorDto } from 'src/domain/dtos';
import { Assignor } from 'src/domain/entities';
import { AssignorRepository } from 'src/repositories';

type Output = {
  assignor: Assignor;
};

@Injectable()
export class CreateAssignorUseCase
  implements UseCase<CreateAssignorDto, Output>
{
  constructor(private readonly assignorRepository: AssignorRepository) {}

  async execute(input: CreateAssignorDto): Promise<Output> {
    const assignor = await this.assignorRepository.create(input);

    return {
      assignor,
    };
  }
}
