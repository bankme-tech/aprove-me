import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infra/database/prisma.service';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';

@Injectable()
export class PayableService {
  constructor(private prismaService: PrismaService) {}

  async create(createPayableDto: CreatePayableDto) {
    const assignor = await this.checkIfAssignorExists(
      createPayableDto.assignor,
    );
    if (!assignor) return;
    const payableData = await this.prismaService.payable.create({
      data: {
        value: createPayableDto.value,
        emissionDate: new Date(createPayableDto.emissionDate),
        assignor: {
          connect: {
            id: createPayableDto.assignor,
          },
        },
      },
    });
    return payableData;
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

  private async checkIfAssignorExists(assignorId: string) {
    return this.prismaService.assignor.findUnique({
      where: {
        id: assignorId,
      },
    });
  }
}
