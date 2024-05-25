import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
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

  update(id: number, updatePayableDto: UpdatePayableDto) {
    return `This action updates a #${id} payable`;
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
