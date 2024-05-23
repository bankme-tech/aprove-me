import { AssignorEntity } from '../domain/entity';
import { IAssignorRepository } from '../domain/repository';
import { AssignorNotFoundException } from '../domain/common/exception';

export class GetAssignorUsecase {
  constructor(private readonly assignorRepo: IAssignorRepository) {}

  async execute(id: string): Promise<AssignorEntity> {
    const assignor = await this.assignorRepo.findById(id);

    if (!assignor) throw new AssignorNotFoundException(id);

    return assignor;
  }
}
