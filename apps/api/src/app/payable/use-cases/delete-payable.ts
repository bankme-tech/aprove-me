import { PayableRepository } from '@/database/repositories/payable.repository';
import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@util/either';
import { isUUID } from 'class-validator';

export enum DeletePayableUseCaseError {
  PAYABLE_NOT_FOUND = 'payable_not_found',
  INVALID_ID_FORMAT = 'invalid_id_format',
}

type DeletePayableUseCaseRequest = {
  id: string;
};

type DeletePayableUseCaseResponse = Either<DeletePayableUseCaseError, null>;

@Injectable()
export class DeletePayableUseCase {
  constructor(private payableRepository: PayableRepository) {}

  async execute({
    id,
  }: DeletePayableUseCaseRequest): Promise<DeletePayableUseCaseResponse> {
    if (!isUUID(id, 4)) {
      return left(DeletePayableUseCaseError.INVALID_ID_FORMAT);
    }

    const payableExists = await this.payableRepository.findById(id);

    if (!payableExists) {
      return left(DeletePayableUseCaseError.PAYABLE_NOT_FOUND);
    }

    await this.payableRepository.delete(id);

    return right(null);
  }
}
