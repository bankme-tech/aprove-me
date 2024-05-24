import { Injectable, NotFoundException } from '@nestjs/common';
import { PayableRepository } from '../repositories/payable.repository';
import { UpdatePayableDto } from '@infra/http/payable/dtos/update-payable.dto';
import { Either, left, right } from '@utils/either';

type UpdatePayableServiceResponse = Either<NotFoundException, Promise<void>>;

@Injectable()
export class UpdatePayableService {
  constructor(private repository: PayableRepository) {}

  async execute(
    id: string,
    { value }: UpdatePayableDto,
  ): Promise<UpdatePayableServiceResponse> {
    const payable = await this.repository.findById(id);

    if (!payable) {
      return left(new NotFoundException('Payable not found'));
    }

    payable.value = value ?? payable.value;
    payable.emissionDate = new Date().toISOString();

    await this.repository.save(payable);

    return right(payable);
  }
}
