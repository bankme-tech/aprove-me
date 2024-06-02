import { Assignor } from '@core/assignor/model';
import { UseCase } from '@core/shared/contracts/usecases';
import { AssignorRepository } from '@core/assignor/ports/repository';
import { Injectable } from '@nestjs/common';

type RegisterAssignorInput = {
  document: string;
  email: string;
  phone: string;
  name: string;
};

@Injectable()
export class RegisterAssignorUseCase
  implements UseCase<RegisterAssignorInput, Assignor>
{
  constructor(private readonly assignorRepository: AssignorRepository) {}

  async execute(input: RegisterAssignorInput): Promise<Assignor> {
    const { document, email, phone, name } = input;
    const assignor = Assignor.create({
      document,
      email,
      phone,
      name,
    });

    if (assignor.containNotifications) {
      return assignor;
    }

    await this.assignorRepository.save(assignor);

    return assignor;
  }
}
