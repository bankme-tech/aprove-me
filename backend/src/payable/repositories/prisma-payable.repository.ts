import { PrismaService } from 'src/persistence/prisma.service';
import { CreatePayableInputDTO } from '../dto/create-payable.input.dto';
import { PayableEntity } from '../entities/payable.entity';
import { IPayableRepository } from './payable.repository.interface';
import { Injectable } from '@nestjs/common';
import { PayableMapper } from '../mappers/payable.mapper.interface';
import { Payable } from '@prisma/client';
import { FindPayableInputDTO } from '../dto/find-payable.input.dto';
import { UpdatePayableInputDTO } from '../dto/update-payable.input.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { RecordNotFoundError } from 'src/persistence/errors/record-not-found.error';

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

  async findOne(findPayableDTO: FindPayableInputDTO): Promise<PayableEntity> {
    const payable = await this.prisma.payable.findUnique({
      where: {
        id: findPayableDTO.id,
      },
    });

    return this.mapper.toDomainEntity(payable);
  }

  async update(
    updatePayableDTO: UpdatePayableInputDTO,
  ): Promise<PayableEntity> {
    try {
      await this.prisma.payable.update({
        where: {
          id: updatePayableDTO.id,
        },
        data: {
          assignorId: updatePayableDTO.assignorId,
          value: updatePayableDTO.value,
        },
      });

      return this.findOne({ id: updatePayableDTO.id });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.meta?.field_name) throw new RecordNotFoundError('Assignor');
        if (error.meta?.cause) throw new RecordNotFoundError('Payable');
      }
      throw error;
    }
  }
}
