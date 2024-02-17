import { Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/base';
import { Assignor } from 'src/domain/entities';
import { AssignorRepository } from 'src/repositories';
import logger from 'src/utils/logger';

type Output = {
  assignors: Assignor[];
};

@Injectable()
export class FetchAllAssignorUseCase implements UseCase<void, Output> {
  constructor(private readonly assignorRepository: AssignorRepository) {}

  async execute(input: void): Promise<Output> {
    const assignors = await this.assignorRepository.fetch();

    return {
      assignors,
    };
  }
}
