import { Injectable, NotFoundException } from '@nestjs/common';
import { PayableRepository } from '../repositories/payable.repository';
import { Either, left, right } from '@utils/either';

type DeletePayableServiceResponse = Either<NotFoundException, Promise<void>>;

@Injectable()
export class DeletePayableService {
  constructor(private repository: PayableRepository) {}

  async execute(id: string): Promise<DeletePayableServiceResponse> {
    console.log('DeletePayableService -> execute -> id', id);
    const payable = await this.repository.findById(id);

    console.log('DeletePayableService -> execute -> payable', payable);
    await this.repository.delete(payable.id);

    if (!payable) {
      return left(new NotFoundException('Payable not found'));
    }

    return right(payable);
  }
}
