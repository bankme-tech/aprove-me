import { PrismaService } from 'src/persistence/prisma.service';
import { CreatePayableInputDTO } from '../dto/create-payable.input.dto';
import { PayableEntity } from '../entities/payable.entity';
import { IPayableRepository } from './payable.repository.interface';
import { Injectable } from '@nestjs/common';
import { IPayableMapper } from '../mappers/payable.mapper.interface';
import { Payable } from '@prisma/client';
import { FindPayableInputDTO } from '../dto/find-payable.input.dto';
import { UpdatePayableInputDTO } from '../dto/update-payable.input.dto';
import { RemovePayableInputDTO } from '../dto/remove-payable.input.dto';

@Injectable()
export class PrismaPayableRepository implements IPayableRepository {
  constructor(
    private readonly prisma: PrismaService,
    private readonly mapper: IPayableMapper<Payable>,
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

  async findById(findPayableDTO: FindPayableInputDTO): Promise<PayableEntity> {
    const payable = await this.prisma.payable.findUniqueOrThrow({
      where: {
        id: findPayableDTO.id,
      },
    });

    return this.mapper.toDomainEntity(payable);
  }

  async update(
    updatePayableDTO: UpdatePayableInputDTO,
  ): Promise<PayableEntity> {
    await this.prisma.payable.update({
      where: {
        id: updatePayableDTO.id,
      },
      data: {
        assignorId: updatePayableDTO.assignorId,
        value: updatePayableDTO.value,
      },
    });

    return this.findById({ id: updatePayableDTO.id });
  }

  async remove(removePayableDTO: RemovePayableInputDTO): Promise<void> {
    await this.prisma.payable.delete({
      where: {
        id: removePayableDTO.id,
      },
    });
  }
}
