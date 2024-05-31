import { Injectable, Logger } from '@nestjs/common';
import { Pagination } from '../../types/Pagination';
import type { CreatePayableDto } from './dto/create-payable.dto';
import type { UpdatePayableDto } from './dto/update-payable.dto';
import type { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PayableService {
  private readonly logger = new Logger(PayableService.name);

  constructor(private prisma: PrismaService) { }
  
  create(createPayableDto: CreatePayableDto) {
    return this.prisma.payable.create({ data: createPayableDto });
  }

  findAll(params: Pagination) {
    return this.prisma.payable.findMany(params);
  }

  findOne(id: string) {
    return this.prisma.payable.findUnique({ where: { id } });
  }

  update(id: string, updatePayableDto: UpdatePayableDto) {
    return this.prisma.payable.update({
      where: { id },
      data: updatePayableDto,
    });
  }

  remove(id: string) {
    return this.prisma.payable.delete({ where: { id } });
  }
}
