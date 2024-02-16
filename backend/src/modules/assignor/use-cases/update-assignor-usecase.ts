import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UseCase } from 'src/core/base';
import { AssignorRepository } from 'src/repositories';

type Input = {
  id: string;
  email?: string;
  phone?: string;
  name?: string;
};

@Injectable()
export class UpdateAssignorUseCase implements UseCase<Input, void> {
  constructor(private readonly assignorRepository: AssignorRepository) {}

  async execute(input: Input): Promise<void> {
    const assignor = this.assignorRepository.findById(input.id);

    if (!assignor) {
      throw new HttpException('Assignor not found', HttpStatus.NOT_FOUND);
    }

    await this.assignorRepository.update(input.id, input);
  }
}
