import { Injectable } from '@nestjs/common';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { PrismaService } from 'src/prisma.service';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class PayablesService {
  constructor(
    private prisma: PrismaService,
    @InjectQueue('payablesBatch') private readonly payablesBatch: Queue,
  ) {}

  create(createPayableDto: CreatePayableDto) {
    return this.prisma.payable.create({
      data: createPayableDto,
    });
  }

  findAll() {
    return this.prisma.payable.findMany();
  }

  findOne(id: string) {
    return this.prisma.payable.findUnique({
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

  batchCreate(createPayableDtos: CreatePayableDto[]) {
    return this.payablesBatch.add('process-payables', createPayableDtos, {
      attempts: 4,
      lifo: true,
    });
  }
}
