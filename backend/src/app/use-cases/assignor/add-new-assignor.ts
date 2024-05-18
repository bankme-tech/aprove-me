import { Injectable } from '@nestjs/common';
import { AssignorRepository } from '@/app/repositories/assignor.repository';
import { Assignor } from '@/app/entities/assignor';

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
  constructor(private assignorRepository: AssignorRepository) { }

  async execute(input: Input): Promise<Output> {
    const newAssignor = new Assignor(input);
    this.assignorRepository.create(newAssignor);

    return { newAssignor };
  }
}
