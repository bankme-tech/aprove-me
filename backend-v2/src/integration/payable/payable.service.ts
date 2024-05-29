import { Injectable, Logger } from '@nestjs/common';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { PrismaService } from 'src/database/prisma.service';

@Injectable()
export class PayableService {
  private readonly logger = new Logger(PayableService.name);

  constructor(private prisma: PrismaService) { }
  
  create(createPayableDto: CreatePayableDto) {
    return this.prisma.payable.create({ data: createPayableDto });
  }

  findAll() {
    return this.prisma.payable.findMany();
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
