import { Assignor } from '@/app/entities/assignor';
import { AssignorNotFound } from '@/app/errors/assignor-not-found';
import { AssignorRepository } from '@/app/repositories/assignor.repository';
import { Injectable } from '@nestjs/common';

interface Input {
  assignorId: string;
  name: string;
  email: string;
  phone: string;
  document: string;
}

interface Output {
  assignor: Assignor;
}

@Injectable()
export class EditAssignor {
  constructor(private assignorRepository: AssignorRepository) {}

  async execute(input: Input): Promise<Output> {
    const { name, email, document, phone } = input;
    const findAssignor = await this.assignorRepository.findById(
      input.assignorId,
    );

    if (!findAssignor) throw new AssignorNotFound();

    findAssignor.updateAssignor({ name, email, phone, document });
    await this.assignorRepository.edit(findAssignor);

    return { assignor: findAssignor };
  }
}
