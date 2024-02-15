import { Injectable } from '@nestjs/common';
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
    
  }
}
