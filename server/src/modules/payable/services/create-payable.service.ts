import { Injectable, NotFoundException } from '@nestjs/common';
import { PayableRepository } from '../repositories/payable.repository';
import { AssignorRepository } from '@modules/assignor/repositories/assignor.repository';
import { CreatePayableDto } from '@infra/http/payable/dtos/create-payable.dto';
import { Payable } from '../entities/payable.entity';
import { Either, left, right } from '@utils/either';
import { Assignor } from '@modules/assignor/entities/assignor.entity';

type CreatePayableServiceResponse = Either<Error, Payable>;

@Injectable()
export class CreatePayableService {
  constructor(
    private repository: PayableRepository,
    private assignorRepository: AssignorRepository,
  ) {}

  async execute(
    userId: string,
    createPayableDto: CreatePayableDto,
  ): Promise<CreatePayableServiceResponse> {
    const { value, emissionDate, assignorId } = createPayableDto;

    console.log(createPayableDto);

    const assignor = await this.assignorRepository.findById(assignorId);

    console.log(assignor);

    if (!assignor) {
      return left(new NotFoundException());
    }

    const payable = Payable.create({
      value,
      assignorId: assignor.id,
      assignor,
      emissionDate: new Date(emissionDate).toISOString(),
    });

    console.log(payable);

    await this.repository.create(payable);

    return right(payable);
  }
}
