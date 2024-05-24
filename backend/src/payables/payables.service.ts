import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { validateDto } from '../utils';
import { CreatePayableDto } from './dto/create.payable.dto';
import { UpdatePayableDto } from './dto/update.payable.dto';
import { ProducerService } from 'src/queue/producer.service';

@Injectable()
export class PayablesService {
  constructor(
    private prisma: PrismaService,
    private produceQueue: ProducerService,
  ) {}

  getPayableById(id: string) {
    return this.prisma.payable.findUnique({
      where: { id },
    });
  }

  async createPayable(createDto: CreatePayableDto) {
    const res = await validateDto(createDto, CreatePayableDto);

    return this.prisma.payable.create({
      data: res,
    });
  }

  async updatePayable(id: string, updateDto: UpdatePayableDto) {
    const result = await validateDto(updateDto, UpdatePayableDto);

    try {
      return await this.prisma.payable.update({
        where: { id },
        data: result,
      });
    } catch (error) {
      if (error?.code === 'P2025') {
        throw new NotFoundException('Payable not found');
      }
      throw error;
    }
  }

  async deletePayable(id: string) {
    const payable = await this.getPayableById(id);

    if (!payable) throw new NotFoundException('Payable not found');

    return this.prisma.payable.delete({
      where: { id },
    });
  }

  async batchCreatePayables(createDtos: CreatePayableDto[]) {
    if (!Array.isArray(createDtos)) {
      throw new BadRequestException(
        'You must provide an array of payables to create',
      );
    }

    if (createDtos.length > 10000) {
      throw new BadRequestException(
        'You can only create a maximum of 10000 payables at a time',
      );
    }
    await this.produceQueue.addToPayableQueue(createDtos);

    return {
      message: 'Your batch create payables is in progress',
    };
  }

  async processBatchCreatePayables(createDtos: CreatePayableDto[] | any[]) {
    let createSuccess = 0;
    let createFailed = 0;

    for (const createDto of createDtos) {
      try {
        await this.createPayable(createDto);
        createSuccess++;
      } catch (error) {
        createFailed++;
      }
    }

    return {
      createSuccess,
      createFailed,
    };
  }
}
