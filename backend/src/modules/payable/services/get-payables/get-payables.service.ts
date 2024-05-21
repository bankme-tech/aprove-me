import { Injectable } from '@nestjs/common';
import { Either, right } from '~/common/utils/either';
import { PayableEntity } from '../../entities/payable.entity';
import { IPayableRepository } from '../../repositories/interfaces/payable.repository-interface';

type ResponseData = Either<Error, PayableEntity[]>;

@Injectable()
export class GetPayablesService {
  constructor(private repository: IPayableRepository) {}

  async execute(): Promise<ResponseData> {
    const payables = await this.repository.findAll();

    return right(payables);
  }
}
