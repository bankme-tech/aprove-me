import { Injectable } from '@nestjs/common';
import { Assignor, Payable } from '@prisma/client';
import { PrismaService } from 'src/infra/database/prisma.service';
import { NotFound, UnprocessableEntity } from 'src/shared/domain/errors';
import { Either, Left, Right } from 'src/shared/domain/utils/either';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';

@Injectable()
export class PayableService {
  constructor(private prismaService: PrismaService) {}

  async create(createPayableDto: CreatePayableDto) {
    const assignor = await this.checkIfAssignorExists(
      createPayableDto.assignorId,
    );
    if (!assignor) return;
    const payableData = await this.prismaService.payable.create({
      data: {
        value: createPayableDto.value,
        emissionDate: new Date(createPayableDto.emissionDate),
        assignor: {
          connect: {
            id: createPayableDto.assignorId,
          },
        },
      },
    });
    return payableData;
  }

  async findAll() {
    return this.prismaService.payable.findMany();
  }

  async findOne(id: string) {
    return this.prismaService.payable.findUnique({
      where: {
        id,
      },
    });
  }

  async update(
    id: string,
    updatePayableDto: UpdatePayableDto,
  ): Promise<Either<NotFound, Payable>> {
    const payableData = await this.findOne(id);
    if (!payableData) return Left.create(new NotFound());
    let assignor: Assignor;
    if (updatePayableDto.assignorId) {
      assignor = await this.checkIfAssignorExists(updatePayableDto.assignorId);
    }
    if (updatePayableDto.assignorId && !assignor) {
      return Left.create(new UnprocessableEntity());
    }
    const payable = { ...payableData, ...updatePayableDto };
    const updatedPayable = await this.prismaService.payable.update({
      where: { id },
      data: {
        value: payable.value,
        emissionDate: new Date(payable.emissionDate),
        assignor: {
          connect: {
            id: payable.assignorId,
          },
        },
      },
    });
    return Right.create(updatedPayable);
  }

  remove(id: number) {
    return `This action removes a #${id} payable`;
  }

  private async checkIfAssignorExists(assignorId: string) {
    return this.prismaService.assignor.findUnique({
      where: {
        id: assignorId,
      },
    });
  }
}
