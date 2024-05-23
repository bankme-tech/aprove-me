import { AssignorRepository } from '@/assignors/repository/assignor.repository'
import { Injectable, NotFoundException } from '@nestjs/common'
import { PayableCreateSchema } from './dto/create-payable.dto'
import { PayableUpdateSchema } from './dto/update-payable.dto'
import { Payable } from './entities/payable.entity'
import { PayableRepository } from './repository/payable.repository'
import { PayablePresenter } from './repository/presenters/payable.presenter'

@Injectable()
export class PayableService {
  constructor(
    private repo: PayableRepository,
    private assignorRepository: AssignorRepository,
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
