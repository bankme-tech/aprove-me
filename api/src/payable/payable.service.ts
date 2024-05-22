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

    return this.prisma.payable.create({
      data: createPayableDto,
    });
  }

  findAll() {
    return this.prisma.payable.findMany();
  }

  findOne(id: string) {
    return this.prisma.payable.findUniqueOrThrow({
      where: { id },
    });
  }

  update(id: string, updatePayableDto: UpdatePayableDto) {
    return this.prisma.payable.update({
      where: { id },
      data: updatePayableDto,
    });
  }

  remove(id: string) {
    return this.prisma.payable.delete({
      where: { id },
    });
  }
}
