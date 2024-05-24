import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { PrismaService } from '../db/prisma.service';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class PayableService {
  constructor(private readonly prisma: PrismaService) {}
  async create(@Body() createPayableDto: CreatePayableDto) {
    const payable = plainToClass(CreatePayableDto, createPayableDto);

    const errors = await validate(payable);
    if (errors.length > 0) {
      throw new BadRequestException(
        errors.map(
          (err) =>
            `${err.property} has wrong value ${err.value}, ${Object.values(err.constraints).join(', ')}`,
        ),
      );
    }

    const { assignor } = createPayableDto;
    const assignorExists = await this.prisma.assignor.findUnique({
      where: { id: assignor },
    });

    if (!assignorExists) {
      throw new BadRequestException('Assignor not found');
    }

    return await this.prisma.payable.create({
      data: createPayableDto,
    });
  }

  async findAll() {
    return await this.prisma.payable.findMany();
  }

  async findOne(id: string) {
    const payable = await this.prisma.payable.findUnique({
      where: { id },
    });
    if (!payable) {
      throw new BadRequestException('Payable not found');
    }
    return payable;
  }

  async update(id: string, updatePayableDto: UpdatePayableDto) {
    return await this.prisma.payable.update({
      where: { id },
      data: updatePayableDto,
    });
  }

  async remove(id: string) {
    return await this.prisma.payable.delete({
      where: { id },
    });
  }
}
