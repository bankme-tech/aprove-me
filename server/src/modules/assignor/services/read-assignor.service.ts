import { Assignor } from '@prisma/client';
import { AssignorRepository } from '../repositories/assignor.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Either, left, right } from '@utils/either';

type ReadAssignorServiceResponse = Either<NotFoundException, Promise<Assignor>>;

@Injectable()
export class ReadAssignorService {
  constructor(private repository: AssignorRepository) {}

  async execute(id: string): Promise<ReadAssignorServiceResponse> {
    const assignor = await this.repository.findById(id);

    if (!assignor) {
      return left(new NotFoundException('Assignor not found'));
    }

    return right(assignor);
  }
}
