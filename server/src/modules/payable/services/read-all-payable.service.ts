import { Injectable } from '@nestjs/common';
import { PayableRepository } from '../repositories/payable.repository';
import { Either, left, right } from '@utils/either';
import { Payable } from '../entities/payable.entity';

type ReadAllPayableServiceResponse = Either<Error, Promise<Payable[]>>;

@Injectable()
export class ReadAllPayableService {
  constructor(private repository: PayableRepository) {}

  async execute(): Promise<ReadAllPayableServiceResponse> {
    const payables = await this.repository.findAll();

    if (!payables) {
      return left(new Error('Payables not found'));
    }

    return right(payables);
  }
}
