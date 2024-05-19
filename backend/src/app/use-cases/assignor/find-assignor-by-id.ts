import { Assignor } from '@/app/entities/assignor';
import { AssignorNotFound } from '@/app/errors/assignor-not-found';
import { AssignorRepository } from '@/app/repositories/assignor.repository';
import { Injectable } from '@nestjs/common';

interface Input {
  assignorId: string;
}

interface Output {
  assignor: Assignor;
}

@Injectable()
export class FindAssignorById {
  constructor(private assignorRepository: AssignorRepository) { }

  async execute(input: Input): Promise<Output> {
    const findById = await this.assignorRepository.findById(input.assignorId);

    if (!findById) throw new AssignorNotFound();

    return { assignor: findById };
  }
}
