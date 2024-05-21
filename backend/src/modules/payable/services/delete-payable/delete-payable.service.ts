import { Injectable } from '@nestjs/common';
import { Either, left, right } from '~/common/utils/either';
import { IPayableRepository } from '../../repositories/interfaces/payable.repository-interface';
import { NotFoundResource } from '~/common/exceptions/not-found-resource.exception';

interface RequestData {
  id: string;
}

type ResponseData = Either<Error, null>;

@Injectable()
export class DeletePayableService {
  constructor(private repository: IPayableRepository) {}

  async execute({ id }: RequestData): Promise<ResponseData> {
    const payable = await this.repository.findById(id);

    if (!payable)
      return left(
        new NotFoundResource(`Payable with id "${payable}" not found.`),
      );

    await this.repository.delete(payable);

    return right(null);
  }
}
