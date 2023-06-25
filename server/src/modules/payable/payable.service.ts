import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreatePayableDto } from './dto/create-payable.dto';
import { UpdatePayableDto } from './dto/update-payable.dto';

import { AssignorRepository } from '../../data/repositories/assignor-repository/assignor-repository';
import { PayableRepository } from '../../data/repositories/payable-repository/payable-repository';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

interface CreateDto {
  data: CreatePayableDto
}
interface ListDto {
  filters: any;
  page: number;
  itemsPerPage: number;
}
interface UpdateDto {
  id: string; 
  data: UpdatePayableDto
}

@Injectable()
export class PayableService {
  
  constructor (
    private readonly payableRepository: PayableRepository,
    private readonly assignorRepository: AssignorRepository,
    
    @InjectQueue('payable')
    private readonly payableQueue: Queue
  ) {}

  async batchCreate({ payables }: { payables: CreatePayableDto[] }) {

    const reference = payables[0].assignorId
    const checkNumberOfDiferentAssignors = payables.filter(payable => payable.assignorId !== reference)
    
    if(checkNumberOfDiferentAssignors.length > 1) {
      throw new BadRequestException('Batch operation is only permitted to the same assignor')
    }

    const assignor = await this.assignorRepository.findOne({
      where: {
        id: reference
      }
    })

    if(!assignor) {
      throw new NotFoundException('Assignor not found, operation canceled')
    }

    await this.payableQueue.add('batch-create', payables, { attempts: 3 })

    // ** Job processing each one separately
    // await this.payableQueue.addBulk(payables.map(item => ({ name: 'create', data: item, opts: { attempts: 3 }})))
    
    return {
      success: true
    }
  }

  async create({ data }: CreateDto) {
    const { assignorId, emissionDate, valueInCents, error } = data

    // For test scenarios only
    if(error) throw new Error('Forced Error')

    const checkIfAssignorExists = await this.assignorRepository.findOne({
      where: {
        id: assignorId,
        deletedAt: null
      }
    })

    if(!checkIfAssignorExists) {
      throw new UnauthorizedException('Assignor does not exist ')
    }

    return await this.payableRepository.create({
      assignorId, 
      emissionDate, 
      valueInCents,
      createdBy: 'any',
      updatedBy: 'any'
    })
  }

  async findOne({ id }: { id: string }) {
    return await this.payableRepository.findOne({
      where: {
        id,
        deletedAt: null
      }
    })
  }

  async findAll({ filters, page, itemsPerPage }: ListDto) {
    const { assignorId } = filters

    return await this.payableRepository.findAll({
      where: { 
        ... (assignorId ? {assignorId} : {}),
        deletedAt: null 
      },
      take: itemsPerPage,
      skip: (page - 1) * itemsPerPage,
    })
  }

  async update({ id, data }: UpdateDto) {
    const {
      valueInCents
    } = data

    const checkIfPayableExists = await this.payableRepository.findOne({
      where: {
        id,
        deletedAt: null
      }
    })

    if(!checkIfPayableExists) {
      throw new UnauthorizedException('Payable not found')
    }

    return await this.payableRepository.update(id, {
      valueInCents
    })
  }

  async remove({ id }:{ id: string }) {
    const checkIfPayableExists = await this.payableRepository.findOne({
      where: {
        id,
        deletedAt: null
      }
    })

    if(!checkIfPayableExists) {
      throw new UnauthorizedException('Payable not found')
    }

    await this.payableRepository.remove(id)
  }
}
