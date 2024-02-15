import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/base';
import { Assignor } from 'src/domain/entities';
import { AssignorRepository } from 'src/repositories';

type Output = {
  assignor: Assignor;
};

@Injectable()
export class FindAssignorByIdUseCase implements UseCase<string, Output> {
  constructor(private readonly assignorRepository: AssignorRepository) {}

  async execute(input: string): Promise<Output> {
    const assignor = await this.assignorRepository.findById(input);

    if (!assignor) {
      throw new HttpException('Assignor not found', HttpStatus.NOT_FOUND);
    }

    return {
      assignor,
    };
  }
}
