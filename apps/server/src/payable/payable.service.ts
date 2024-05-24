import { AssignorRepository } from '@/assignors/repository/assignor.repository'
import { InjectQueue } from '@nestjs/bull'
import { Injectable, NotFoundException } from '@nestjs/common'
import { Queue } from 'bull'
import {
  PayableCreateSchema,
  PayableCreateSchemaBatch,
} from './dto/create-payable.dto'
import { PayableUpdateSchema } from './dto/update-payable.dto'
import { Payable } from './entities/payable.entity'
import { PayableRepository } from './repository/payable.repository'
import { PayablePresenter } from './repository/presenters/payable.presenter'

@Injectable()
export class PayableService {
  constructor(
    private repo: PayableRepository,
    private assignorRepository: AssignorRepository,
    @InjectQueue('process-data') private audioQueue: Queue,
  ) {}

  async get(payableId: string) {
    const payable = await this.repo.findById(payableId)
    if (!payable) {
      throw new NotFoundException('Payable not Found')
    }
    return PayablePresenter.toResponseHttp(payable)
  }

  async create(data: PayableCreateSchema) {
    const assignor = await this.assignorRepository.findById(data.assignorId)

    if (!assignor) {
      throw new NotFoundException('Assignor not found')
    }

    const payable = Payable.create({
      assignorId: data.assignorId,
      value: data.value,
      emissionDate: new Date(data.emissionDate),
    })
    await this.repo.create(payable)
    return PayablePresenter.toResponseHttp(payable)
  }

  async createMany(payableBatch: PayableCreateSchemaBatch) {
    const jobs = payableBatch.map((data) => ({
      data: {
        payable: data,
      },
    }))
    await this.audioQueue.addBulk(jobs)
  }

  async cancel(payableId: string) {
    const payable = await this.repo.findById(payableId)
    if (!payable) {
      throw new NotFoundException('Payable not Found')
    }

    payable.cancel()
    await this.repo.save(payable)
    return PayablePresenter.toResponseHttp(payable)
  }

  async pay(payableId: string) {
    const payable = await this.repo.findById(payableId)
    if (!payable) {
      throw new NotFoundException('Payable not Found')
    }

    payable.pay()
    await this.repo.save(payable)
    return PayablePresenter.toResponseHttp(payable)
  }

  async update(data: PayableUpdateSchema, payableId: string) {
    const payable = await this.repo.findById(payableId)
    if (!payable) {
      throw new NotFoundException('Payable not Found')
    }
    payable.value = data.value
    await this.repo.save(payable)
    return PayablePresenter.toResponseHttp(payable)
  }

  async destroy(payableId: string) {
    await this.repo.delete(payableId)
  }
}
