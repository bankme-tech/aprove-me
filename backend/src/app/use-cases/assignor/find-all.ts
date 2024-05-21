import { Assignor } from '@/app/entities/assignor';
import { AssignorRepository } from '@/app/repositories/assignor.repository';
import { Injectable } from '@nestjs/common';

interface Output {
  assignors: Assignor[];
}

@Injectable()
export class FindAllAssingors {
  constructor(private assignorRepository: AssignorRepository) { }

  async execute(): Promise<Output> {
    const assignors = await this.assignorRepository.findAll();

    return { assignors };
  }
}
