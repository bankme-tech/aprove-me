import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';
import PayableRepository from './repositories/payable.repository';
import { Payable } from './entities/payable.entity';

@Injectable()
export class PayableService {
  constructor(private readonly payableRepository: PayableRepository) {}

  async create(createPayableDto: CreatePayableDto): Promise<Payable> {
    //TODO: Find the assignor by ID

    return await this.payableRepository.create(createPayableDto);
  }

  async findAll(): Promise<Payable[]> {
    return await this.payableRepository.findAll();
  }

  async findOne(id: string): Promise<Payable> {
    const payable = await this.payableRepository.findOne(id);
    if (!payable) {
      throw new NotFoundException(`Payable #${id} not found`);
    }
    return payable;
  }

  async update(
    id: string,
    updatePayableDto: UpdatePayableDto,
  ): Promise<Payable> {
    return await this.payableRepository.update(id, updatePayableDto);
  }

  async remove(id: string) {
    return await this.payableRepository.delete(id);
  }
}
