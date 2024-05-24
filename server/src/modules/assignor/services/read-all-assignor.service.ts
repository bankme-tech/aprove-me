import { Injectable } from '@nestjs/common';
import { AssignorRepository } from '../repositories/assignor.repository';
import { Assignor } from '../entities/assignor.entity';
import { Either, left, right } from '@utils/either';

type ReadAllAssignorServiceResponse = Either<Error, Promise<Assignor[]>>;

@Injectable()
export class ReadAllAssignorService {
  constructor(private repository: AssignorRepository) {}

  async execute(): Promise<ReadAllAssignorServiceResponse> {
    const assignors = await this.repository.findAll();

    if (!assignors) {
      return left(new Error('Assignors not found'));
    }

    return right(assignors);
  }
}
