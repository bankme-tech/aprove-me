import { AssignorRepository } from '@/database/repositories/assignor.repository';
import { Injectable } from '@nestjs/common';
import { Assignor } from '@prisma/client';
import { Either, left, right } from '@util/either';
import { isUUID } from 'class-validator';

export enum GetAssignorByIdUseCaseError {
  ASSIGNOR_NOT_FOUND = 'assignor_not_found',
  INVALID_ID_FORMAT = 'invalid_id_format',
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
    if (!isUUID(id, 4)) {
      return left(GetAssignorByIdUseCaseError.INVALID_ID_FORMAT);
    }

    const assignor = await this.assignorRepository.findById(id);

    if (!assignor) {
      return left(GetAssignorByIdUseCaseError.ASSIGNOR_NOT_FOUND);
    }

    return right({ assignor });
  }
}
