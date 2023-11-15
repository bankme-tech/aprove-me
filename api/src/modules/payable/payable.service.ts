import { Inject } from '@nestjs/common';
import { CreatePayableDTO } from './dto/create-payable.dto';
import { IPayableRepository } from './interfaces/payable.repository.interface';
import { IPayableService } from './interfaces/payable.service.interface';
import { PayableRepository } from '../../infra/database/prisma/payable.repository';
import { IPayable } from './interfaces/payable.interface';
import { UpdatePayableDTO } from './dto/update-payable.dto';

export class PayableService implements IPayableService {
  constructor(
    @Inject(PayableRepository)
    private readonly payableRepository: IPayableRepository,
  ) {}

  async findAll(): Promise<IPayable[]> {
    return this.payableRepository.findAll();
  }

  async findById(id: string): Promise<IPayable> {
    return this.payableRepository.findById(id);
  }

  async create(payable: CreatePayableDTO): Promise<CreatePayableDTO> {
    await this.payableRepository.create({
      id: payable.id,
      value: payable.value,
      emissionDate: new Date(payable.emissionDate),
      assignorId: payable.assignor,
    });

    return payable;
  }

  async update(id: string, payable: UpdatePayableDTO): Promise<IPayable> {
    return this.payableRepository.update({ id, ...payable });
  }

  async delete(id: string): Promise<void> {
    await this.payableRepository.delete(id);
  }
}
