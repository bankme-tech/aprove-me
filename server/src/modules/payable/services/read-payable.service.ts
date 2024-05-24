import { Payable } from '@prisma/client';
import { PayableRepository } from '../repositories/payable.repository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { Either, left, right } from '@utils/either';

type ReadPayableServiceResponse = Either<NotFoundException, Promise<Payable>>;

@Injectable()
export class ReadPayableService {
  constructor(private repository: PayableRepository) {}

  async execute(id: string): Promise<ReadPayableServiceResponse> {
    const payable = await this.repository.findById(id);

    if (!payable) {
      return left(new NotFoundException('Payable not found'));
    }

    return right(payable);
  }
}
