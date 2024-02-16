import { PayableRepository } from '@/database/repositories/payable.repository';
import { Injectable } from '@nestjs/common';
import { Payable } from '@prisma/client';
import { Either, left, right } from '@util/either';
import { isUUID } from 'class-validator';

export enum GetPayableByIdUseCaseError {
  INVALID_ID_FORMAT = 'invalid_id_format',
  PAYABLE_NOT_FOUND = 'payable_not_found',
}

type GetPayableByIdUseCaseRequest = {
  id: string;
};

type GetPayableByIdUseCaseResponse = Either<
  GetPayableByIdUseCaseError,
  {
    payable: Payable;
  }
>;

@Injectable()
export class GetPayableByIdUseCase {
  constructor(private payableRepository: PayableRepository) {}

  async execute({
    id,
  }: GetPayableByIdUseCaseRequest): Promise<GetPayableByIdUseCaseResponse> {
    if (!isUUID(id, 4)) {
      return left(GetPayableByIdUseCaseError.INVALID_ID_FORMAT);
    }

    const payable = await this.payableRepository.findById(id);

    if (!payable) {
      return left(GetPayableByIdUseCaseError.PAYABLE_NOT_FOUND);
    }

    return right({ payable });
  }
}
