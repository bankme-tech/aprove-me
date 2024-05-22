import { Injectable } from '@nestjs/common';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { PrismaService } from 'src/prisma.service';

// Service layer automatically created together with the controller via terminal.
@Injectable()
export class PayableService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createPayableDto: CreatePayableDto) {
    const response = await this.prisma.payable.create({
      data: {
        value: createPayableDto.value,
        assignorId: createPayableDto.assignor,
      },
    });
    return response;
  }

  async findAll() {
    const response = await this.prisma.payable.findMany();
    return response;
  }

  async findOne(id: string) {
    const response = await this.prisma.payable.findUnique({
      where: { id },
    });
    return response;
  }

  async update(id: string, updatePayableDto: UpdatePayableDto) {
    const response = await this.prisma.payable.update({
      where: { id },
      data: { value: updatePayableDto.value },
    });
    return response;
  }

  async remove(id: string) {
    const response = await this.prisma.payable.delete({
      where: { id },
    });
    return response;
  }
}
