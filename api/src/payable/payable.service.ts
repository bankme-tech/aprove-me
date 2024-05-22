import { Injectable } from '@nestjs/common';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class PayableService {
  constructor(private readonly prisma: PrismaService) {}
  create(createPayableDto: CreatePayableDto) {
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
