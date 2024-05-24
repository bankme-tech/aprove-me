import { PrismaService } from 'src/persistence/prisma.service';
import { CreatePayableInputDTO } from '../dto/create-payable.input.dto';
import { PayableEntity } from '../entities/payable.entity';
import { IPayableRepository } from './payable.repository.interface';
import { Injectable } from '@nestjs/common';
import { PayableMapper } from '../mappers/payable.mapper.interface';
import { Payable } from '@prisma/client';

@Injectable()
export class PrismaPayableRepository implements IPayableRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: PayableMapper<Payable>,
  ) {}

  async save(createPayableDTO: CreatePayableInputDTO): Promise<PayableEntity> {
    const payable = this.mapper.toPersistenceModel(createPayableDTO);
    const response = await this.prisma.payable.create({
      data: {
        ...payable,
      },
    });

    return this.mapper.toDomainEntity(response);
  }

  async findAll(): Promise<PayableEntity[]> {
    const payables = await this.prisma.payable.findMany();
    return payables.map((payable) => this.mapper.toDomainEntity(payable));
  }
}
