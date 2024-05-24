import { Injectable, NotFoundException } from '@nestjs/common';
import { Either, left, right } from '@utils/either';
import { AssignorRepository } from '../repositories/assignor.repository';

type DeleteAssignorServiceResponse = Either<NotFoundException, void>;

@Injectable()
export class DeleteAssignorService {
  constructor(private repository: AssignorRepository) {}

  async execute(id: string): Promise<DeleteAssignorServiceResponse> {
    const assignor = await this.repository.findById(id);

    if (!assignor) {
      return left(new NotFoundException('Assignor not found'));
    }

    await this.repository.delete(id);

    return right(undefined);
  }
}
