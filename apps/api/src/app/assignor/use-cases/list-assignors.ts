import { AssignorRepository } from '@/database/repositories/assignor.repository';
import { Injectable } from '@nestjs/common';
import { Assignor } from '@prisma/client';
import { Either, right } from '@util/either';

type ListAssignorsUseCaseResponse = Either<
  null,
  {
    assignors: Assignor[];
  }
>;

@Injectable()
export class ListAssignorsUseCase {
  constructor(private assignorRepository: AssignorRepository) {}

  async execute(): Promise<ListAssignorsUseCaseResponse> {
    const assignors = await this.assignorRepository.findAll();

    return right({ assignors });
  }
}
