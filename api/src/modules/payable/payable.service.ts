import { Inject } from '@nestjs/common';
import { CreatePayableDTO } from './dto/create-payable.dto';
import { IPayableRepository } from './interfaces/payable.repository.interface';
import { IPayableService } from './interfaces/payable.service.interface';
import { PayableRepository } from 'src/infra/database/prisma/payable.repository';

export class PayableService implements IPayableService {
  constructor(
    @Inject(PayableRepository)
    private readonly payableRepository: IPayableRepository,
  ) {}

  async create(payable: CreatePayableDTO): Promise<CreatePayableDTO> {
    await this.payableRepository.create({
      id: payable.id,
      value: payable.value,
      emissionDate: new Date(payable.emissionDate),
      assignorId: payable.assignor,
    });

    return payable;
  }
}
