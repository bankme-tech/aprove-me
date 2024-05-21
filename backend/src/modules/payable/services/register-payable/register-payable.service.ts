import { Injectable } from '@nestjs/common';
import { Either, left, right } from '~/common/utils/either';
import { PayableEntity } from '../../entities/payable.entity';
import { IPayableRepository } from '../../repositories/interfaces/payable.repository-interface';
import { IAssignorRepository } from '~/modules/assignor/repositories/interfaces/assignor.repository-interface';
import { NotFoundResource } from '~/common/exceptions/not-found-resource.exception';

interface RequestData {
  value: number;
  emissionDate: Date;
  assignorId: string;
}

type ResponseData = Either<Error, PayableEntity>;

@Injectable()
export class RegisterPayableService {
  constructor(
    private repository: IPayableRepository,
    private assignorRepository: IAssignorRepository,
  ) {}

  async execute({
    emissionDate,
    value,
    assignorId,
  }: RequestData): Promise<ResponseData> {
    const assignor = await this.assignorRepository.findById(assignorId);

    if (!assignor) return left(new NotFoundResource('Assignor not found!'));

    const payableOrError = PayableEntity.create({
      emissionDate,
      value,
      assignorId: assignorId,
    });

    if (payableOrError.isLeft()) return left(payableOrError.value);

    await this.repository.create(payableOrError.value);

    return right(payableOrError.value);
  }
}
