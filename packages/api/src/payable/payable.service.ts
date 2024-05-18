import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePayableDto } from './dto/create-payable.dto';
import { PayableRepository } from './repositories/payable-repository';
import { AssignorRepository } from '@assignor/repositories/assignor-repository';
import { UpdatePayableDto } from './dto/update-payable.dto';

@Injectable()
export class PayableService {
  constructor(
    private readonly payableRepository: PayableRepository,
    private readonly assignorRepository: AssignorRepository,
  ) {}

  async create(createPayableDto: CreatePayableDto) {
    const assignor = await this.assignorRepository.findById(createPayableDto.assignorId);
    if (!assignor) {
      throw new NotFoundException('assignor not found');
    }

    return this.payableRepository.create(createPayableDto);
  }

  async getAll() {
    return this.payableRepository.getAll();
  }

  async delete(id: string) {
    return this.payableRepository.delete(id);
  }

  async findById(id: string) {
    const payable = await this.payableRepository.findById(id);
    if (!payable) {
      throw new NotFoundException('payable not found');
    }

    return payable;
  }

  async update(id: string, updatePayableDto: UpdatePayableDto) {
    return this.payableRepository.update(id, updatePayableDto);
  }
}
