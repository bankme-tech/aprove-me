import { AssignorRepository } from '@/database/repositories/assignor.repository';
import { PayableRepository } from '@/database/repositories/payable.repository';
import { Injectable } from '@nestjs/common';
import { Either, left, right } from '@util/either';
import { isUUID } from 'class-validator';
import { dayjs } from '@lib/dayjs';
import { Payable } from '@prisma/client';

export enum UpdatePayableUseCaseError {
  INVALID_ID_FORMAT = 'invalid_id_format',
  ASSIGNOR_INVALID_ID = 'assignor_invalid_id',
  ASSIGNOR_NOT_FOUND = 'assignor_not_found',
  PAYABLE_NOT_FOUND = 'payable_not_found',
  INVALID_EMISSION_DATE_FORMAT = 'invalid_emission_date_format',
  INVALID_EMISSION_DATE = 'invalid_emission_date',
  INVALID_VALUE = 'invalid_value',
}

type UpdatePayableUseCaseRequest = {
  id: string;
  value?: number;
  emissionDate?: string;
  assignorId?: string;
};

type UpdatePayableUseCaseResponse = Either<
  UpdatePayableUseCaseError,
  {
    payable: Payable;
  }
>;

@Injectable()
export class UpdatePayableUseCase {
  constructor(
    private payableRepository: PayableRepository,
    private assignorRepository: AssignorRepository,
  ) {}

  async execute({
    id,
    ...data
  }: UpdatePayableUseCaseRequest): Promise<UpdatePayableUseCaseResponse> {
    if (!isUUID(id, 4)) {
      return left(UpdatePayableUseCaseError.INVALID_ID_FORMAT);
    }

    const existsPayable = await this.payableRepository.findById(id);

    if (!existsPayable) {
      return left(UpdatePayableUseCaseError.PAYABLE_NOT_FOUND);
    }

    const fieldsToUpdate: Partial<Payable> = {};

    if (data.assignorId) {
      if (!isUUID(data.assignorId, 4)) {
        return left(UpdatePayableUseCaseError.ASSIGNOR_INVALID_ID);
      }

      const assignor = await this.assignorRepository.findById(data.assignorId);

      if (!assignor) {
        return left(UpdatePayableUseCaseError.ASSIGNOR_NOT_FOUND);
      }

      fieldsToUpdate.assignorId = data.assignorId;
    }

    if (data.emissionDate) {
      const dateValidationRegex = new RegExp(/\d{4}-\d{2}-\d{2}/g); // yyyy-mm-dd

      if (!dateValidationRegex.test(data.emissionDate as string)) {
        return left(UpdatePayableUseCaseError.INVALID_EMISSION_DATE_FORMAT);
      }

      const date = dayjs(data.emissionDate, 'YYYY-MM-DD', true);

      if (!date.isValid()) {
        return left(UpdatePayableUseCaseError.INVALID_EMISSION_DATE);
      }

      fieldsToUpdate.emissionDate = date.toDate();
    }

    if (data.value) {
      if (data.value <= 0) {
        return left(UpdatePayableUseCaseError.INVALID_VALUE);
      }

      fieldsToUpdate.value = data.value;
    }

    const payable = await this.payableRepository.update(id, fieldsToUpdate);

    return right({
      payable,
    });
  }
}
