import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';

import { AssignorRepository } from '../../data/repositories/assignor-repository/assignor-repository';
import { PayableRepository } from '../../data/repositories/payable-repository/payable-repository';

interface CreateDto {
  data: CreatePayableDto
}

@Injectable()
export class PayableService {
  
  constructor (
    private readonly payableRepository: PayableRepository,
    private readonly assignorRepository: AssignorRepository
  ) {}

  async create({ data }: CreateDto) {
    const { assignorId, emissionDate, valueInCents } = data

    const checkIfAssignorExists = await this.assignorRepository.findOne({
      where: {
        id: assignorId
      }
    })

    if(!checkIfAssignorExists) {
      throw new UnauthorizedException('Assignor does not exist ')
    }

    return await this.payableRepository.create({
      assignorId, emissionDate, valueInCents
    })
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
}
