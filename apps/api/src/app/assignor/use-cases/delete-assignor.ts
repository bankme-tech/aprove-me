import { AssignorRepository } from '@/database/repositories/assignor.repository';
import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@util/either';
import { isUUID } from 'class-validator';

export enum DeleteAssignorUseCaseError {
  ASSIGNOR_NOT_FOUND = 'assignor_not_found',
  INVALID_ID_FORMAT = 'invalid_id_format',
}

type DeleteAssignorUseCaseRequest = {
  id: string;
};

type DeleteAssignorUseCaseResponse = Either<DeleteAssignorUseCaseError, null>;

@Injectable()
export class DeleteAssignorUseCase {
  constructor(private assignorRepository: AssignorRepository) {}

  async execute({
    id,
  }: DeleteAssignorUseCaseRequest): Promise<DeleteAssignorUseCaseResponse> {
    if (!isUUID(id, 4)) {
      return left(DeleteAssignorUseCaseError.INVALID_ID_FORMAT);
    }

    const assignorExists = await this.assignorRepository.findById(id);

    if (!assignorExists) {
      return left(DeleteAssignorUseCaseError.ASSIGNOR_NOT_FOUND);
    }

    await this.assignorRepository.delete(id);

    return right(null);
  }
}
