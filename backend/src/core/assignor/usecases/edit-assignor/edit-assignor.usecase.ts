import { Injectable, NotFoundException } from '@nestjs/common';
import { Assignor } from '@core/assignor/model';
import { UseCase } from '@core/shared/contracts/usecases';
import { AssignorRepository } from '@core/assignor/ports/repository';

export type EditAssignorInput = {
  id: string;
  document: string;
  email: string;
  phone: string;
  name: string;
};

type EditAssignorOutput = {
  assignor?: Assignor;
  notifications?: { [key: string]: string[] };
};

@Injectable()
export class EditAssignorUseCase
  implements UseCase<EditAssignorInput, EditAssignorOutput>
{
  constructor(private readonly assignorRepository: AssignorRepository) {}

  async execute(input: EditAssignorInput): Promise<EditAssignorOutput> {
    const { id, document, email, phone, name } = input;

    const assignor = await this.assignorRepository.findById(id);

    if (!assignor) {
      throw new NotFoundException('Assignor not found');
    }

    assignor.update({
      document,
      email,
      phone,
      name,
    });

    if (assignor.containNotifications) {
      return { assignor };
    }

    await this.assignorRepository.save(assignor);

    return { assignor };
  }
}
