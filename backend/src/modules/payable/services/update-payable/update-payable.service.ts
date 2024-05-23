import { Injectable } from '@nestjs/common';
import { Either, left, right } from '~/common/utils/either';
import { PayableEntity } from '../../entities/payable.entity';
import { IPayableRepository } from '../../repositories/interfaces/payable.repository-interface';
import { NotFoundResource } from '~/common/exceptions/not-found-resource.exception';
import { IAssignorRepository } from '~/modules/assignor/repositories/interfaces/assignor.repository-interface';

interface RequestData {
  id: string;
  value: number;
  emissionDate: Date;
  assignorId: string;
}

type ResponseData = Either<Error, PayableEntity>;

@Injectable()
export class UpdatePayableService {
  constructor(
    private repository: IPayableRepository,
    private assignorPayable: IAssignorRepository,
  ) {}

  async execute({
    id,
    value,
    emissionDate,
    assignorId,
  }: RequestData): Promise<ResponseData> {
    const payable = await this.repository.findById(id);

    if (!payable) {
      return left(
        new NotFoundResource(`Payable with id "${payable}" not found.`),
      );
    }

    const assignor = await this.assignorPayable.findById(assignorId);

    if (!assignor) {
      return left(
        new NotFoundResource(`Assignor with id "${assignorId}" not found.`),
      );
    }

    payable.value = value;
    payable.emissionDate = emissionDate;
    payable.assignorId = assignorId;

    await this.repository.update(payable);

    return right(payable);
  }
}
