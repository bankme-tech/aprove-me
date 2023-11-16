import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import { PayableRepository } from './payable.repository';
import { Payable } from '@prisma/client';

@Injectable()
export class PayableService {
  constructor(private readonly payableRepository: PayableRepository) {}

  async validateAssignorExists(assignorId: number): Promise<void> {
    const assignorExists = await this.payableRepository.doesAssignorExist(assignorId);

    if (!assignorExists) {
      throw new NotFoundException(`Assignor with id ${assignorId} not found.`);
    }
  }

  async validatePayableExists(id: string): Promise<void> {
    const payable = await this.payableRepository.findOne(id);

    if (!payable) {
      throw new NotFoundException(`Receivable with id ${id} not found.`);
    }
  }

  async create(createPayableDto: CreatePayableDto): Promise<Payable> {
    await this.validateAssignorExists(createPayableDto.assignorId);
    return this.payableRepository.create(createPayableDto);
  }

  async findAll(): Promise<Payable[]> {
    return this.payableRepository.findAll();
  }

  async findOne(id: string): Promise<Payable | null> {
    const payable = await this.payableRepository.findOne(id);

    if (!payable) {
      throw new NotFoundException(`Receivable with id ${id} not found.`);
    }

    return payable;
  }

  async update(id: string, updatePayableDto: UpdatePayableDto): Promise<Payable> {
    await this.validatePayableExists(id);

    if (updatePayableDto.assignorId) {
      await this.validateAssignorExists(updatePayableDto.assignorId);
    }

    return this.payableRepository.update(id, updatePayableDto);
  }

  async remove(id: string): Promise<Payable> {
    await this.validatePayableExists(id);
    return this.payableRepository.remove(id);
  }
}
