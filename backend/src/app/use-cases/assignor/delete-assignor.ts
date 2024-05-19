import { AssignorNotFound } from '@/app/errors/assignor-not-found';
import { AssignorRepository } from '@/app/repositories/assignor.repository';
import { Injectable } from '@nestjs/common';

interface Input {
  assignorId: string;
}

type Output = void;

@Injectable()
export class DeleteAssignor {
  constructor(private assignorRepository: AssignorRepository) {}

  async execute(input: Input): Promise<Output> {
    const findAssignor = await this.assignorRepository.findById(
      input.assignorId,
    );

    if (!findAssignor) throw new AssignorNotFound();

    await this.assignorRepository.delete(input.assignorId);
  }
}
