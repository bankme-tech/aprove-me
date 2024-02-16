import { AssignorRepository } from '@/database/repositories/assignor.repository';
import { Injectable } from '@nestjs/common';
import { Assignor } from '@prisma/client';
import { Either, left, right } from '@util/either';

export enum GetAssignorByIdUseCaseError {
  ASSIGNOR_NOT_FOUND = 'assignor_not_found',
}

type GetAssignorByIdUseCaseRequest = {
  id: string;
};

type GetAssignorByIdUseCaseResponse = Either<
  GetAssignorByIdUseCaseError,
  {
    assignor: Assignor;
  }
>;

@Injectable()
export class GetAssignorByIdUseCase {
  constructor(private assignorRepository: AssignorRepository) {}

  async execute({
    id,
  }: GetAssignorByIdUseCaseRequest): Promise<GetAssignorByIdUseCaseResponse> {
    const assignor = await this.assignorRepository.findById(id);

    if (!assignor) {
      return left(GetAssignorByIdUseCaseError.ASSIGNOR_NOT_FOUND);
    }

    return right({ assignor });
  }
}
