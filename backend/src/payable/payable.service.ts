import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePayableDto } from './dto/create-payable.dto';
import { Payable } from '@prisma/client';
import PayableRepository from './repository/payableRepository';
import AssignorRepository from 'src/assignor/repositories/assignorRepository';
import { UpdatePayableDto } from './dto/update-payable.dto';

@Injectable()
export class PayableService {
  constructor(
    private readonly payableRepository: PayableRepository,
    private readonly assignorRepository: AssignorRepository,
  ) {}

  async create(createPayableDto: CreatePayableDto): Promise<Payable> {
    const assignor = await this.assignorRepository.findOne(
      createPayableDto.assignorId,
    );
    if (!assignor) {
      throw new NotFoundException('Assignor not found');
    }

    return this.payableRepository.create(createPayableDto);
  }

  async findAll(): Promise<Payable[]> {
    return this.payableRepository.findAll();
  }


  async findOne(id: string): Promise<Payable> {
    try {
      const payable = await this.payableRepository.findOne(id);
      return payable;
    } catch (error) {
      throw new NotFoundException('Payable not found');
    }
  }

  async update(
    id: string,
    updatePayableDto: UpdatePayableDto,
  ): Promise<Payable> {
    const assignor = await this.assignorRepository.findOne(
      updatePayableDto.assignorId,
    );
    if (!assignor) {
      throw new NotFoundException('Assignor not found');
    }

    await this.findOne(id);
    return this.payableRepository.update(id, updatePayableDto);
  }

  async remove(id: string): Promise<void> {
    await this.findOne(id);
    await this.payableRepository.remove(id);
  }
}
