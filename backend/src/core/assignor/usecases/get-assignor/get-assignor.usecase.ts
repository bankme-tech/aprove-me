import { Injectable, NotFoundException } from '@nestjs/common';
import { Assignor } from '@core/assignor/model';
import { UseCase } from '@core/shared/contracts/usecases';
import { AssignorRepository } from '@core/assignor/ports/repository';

@Injectable()
export class GetAssignorUseCase implements UseCase<string, Assignor | null> {
  constructor(private readonly assignorRepository: AssignorRepository) {}

  async execute(id: string): Promise<Assignor | null> {
    const assignor = await this.assignorRepository.findById(id);

    if (!assignor) {
      throw new NotFoundException('Assignor not found');
    }

    return assignor;
  }
}
