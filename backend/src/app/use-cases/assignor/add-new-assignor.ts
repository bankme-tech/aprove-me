import { Injectable } from '@nestjs/common';
import { AssignorRepository } from '@/app/repositories/assignor.repository';
import { Assignor } from '@/app/entities/assignor';
import { AssignorAlreadyExists } from '@/app/errors/assignor-already-exists';

interface Input {
  name: string;
  email: string;
  document: string;
  phone: string;
}

interface Output {
  newAssignor: Assignor;
}

@Injectable()
export class AddNewAssignor {
  constructor(private assignorRepository: AssignorRepository) {}

  async execute(input: Input): Promise<Output> {
    const [assignorEmail, assignorDocument] = await Promise.all([
      this.assignorRepository.findByEmail(input.email),
      this.assignorRepository.findByDocument(input.document),
    ]);

    if (assignorEmail || assignorDocument) {
      throw new AssignorAlreadyExists();
    }

    const newAssignor = new Assignor(input);
    this.assignorRepository.create(newAssignor);

    return { newAssignor };
  }
}
