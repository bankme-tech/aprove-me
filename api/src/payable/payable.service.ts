import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { PrismaService } from 'src/prisma/prisma.service';
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

    return this.prisma.payable.create({
      data: createPayableDto,
    });
  }

  findAll() {
    return `This action returns all payable`;
  }

  findOne(id: number) {
    return `This action returns a #${id} payable`;
  }

  update(id: number, updatePayableDto: UpdatePayableDto) {
    return `This action updates a #${id} payable`;
  }

  remove(id: number) {
    return `This action removes a #${id} payable`;
  }
}
