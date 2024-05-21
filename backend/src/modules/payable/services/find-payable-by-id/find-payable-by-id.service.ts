import { Injectable } from '@nestjs/common';
import { IPayableRepository } from '../../repositories/interfaces/payable.repository-interface';
import { Either, left, right } from '~/common/utils/either';
import { PayableEntity } from '../../entities/payable.entity';
import { NotFoundResource } from '~/common/exceptions/not-found-resource.exception';

interface RequestData {
  id: string;
}

type ResponseDate = Either<Error, PayableEntity>;

@Injectable()
export class FindPayableByIdService {
  constructor(private repository: IPayableRepository) {}

  async execute({ id }: RequestData): Promise<ResponseDate> {
    const payable = await this.repository.findById(id);

    if (!payable) return left(new NotFoundResource('Payable not found.'));

    return right(payable);
  }
}
