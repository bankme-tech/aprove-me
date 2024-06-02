import { Injectable, NotFoundException } from '@nestjs/common';
import { UseCase } from '@core/shared/contracts/usecases';
import { AssignorRepository } from '@core/assignor/ports/repository';

export type DeleteAssignorInput = {
  id: string;
};

@Injectable()
export class DeleteAssignorUseCase
  implements UseCase<DeleteAssignorInput, void>
{
  constructor(private readonly assignorRepository: AssignorRepository) {}

  async execute(input: DeleteAssignorInput): Promise<void> {
    const { id } = input;

    const assignor = await this.assignorRepository.findById(id);

    if (!assignor) {
      throw new NotFoundException('Assignor not found');
    }

    await this.assignorRepository.delete(id);
  }
}
