import { AssignorRepository } from '@/database/repositories/assignor.repository';
import { PayableRepository } from '@/database/repositories/payable.repository';
import { Either, left, right } from '@util/either';
import { Injectable } from '@nestjs/common';
import { Payable } from '@prisma/client';
import { dayjs } from '@lib/dayjs';
import { isUUID } from 'class-validator';
import { randomUUID } from 'crypto';

export enum CreatePayableUseCaseError {
  ASSIGNOR_NOT_FOUND = 'assignor_not_found',
  INVALID_ASSIGNOR_ID = 'invalid_assignor_id',
  INVALID_EMISSION_DATE_FORMAT = 'invalid_emission_date_format',
  INVALID_EMISSION_DATE = 'invalid_emission_date',
  INVALID_VALUE = 'invalid_value',
}

type CreatePayableUseCaseRequest = {
  value: number;
  emissionDate: string;
  assignorId: string;
};

type CreatePayableUseCaseResponse = Either<
  CreatePayableUseCaseError,
  {
    payable: Payable;
  }
>;

@Injectable()
export class CreatePayableUseCase {
  constructor(
    private payableRepository: PayableRepository,
    private assignorRepository: AssignorRepository,
  ) {}

  async execute({
    value,
    assignorId,
    emissionDate,
  }: CreatePayableUseCaseRequest): Promise<CreatePayableUseCaseResponse> {
    const dateValidationRegex = new RegExp(/\d{4}-\d{2}-\d{2}/g); // yyyy-mm-dd

    if (!dateValidationRegex.test(emissionDate)) {
      return left(CreatePayableUseCaseError.INVALID_EMISSION_DATE_FORMAT);
    }

    const date = dayjs(emissionDate, 'YYYY-MM-DD', true);

    if (!date.isValid()) {
      return left(CreatePayableUseCaseError.INVALID_EMISSION_DATE);
    }

    if (value <= 0) {
      return left(CreatePayableUseCaseError.INVALID_VALUE);
    }

    if (!isUUID(assignorId, 4)) {
      return left(CreatePayableUseCaseError.INVALID_ASSIGNOR_ID);
    }

    const assignorExists = await this.assignorRepository.findById(assignorId);

    if (!assignorExists) {
      return left(CreatePayableUseCaseError.ASSIGNOR_NOT_FOUND);
    }

    const payable = await this.payableRepository.create({
      id: randomUUID(),
      assignorId,
      value,
      emissionDate: date.toDate(),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    return right({
      payable,
    });
  }
}
