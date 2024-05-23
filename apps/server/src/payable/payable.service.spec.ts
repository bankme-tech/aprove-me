import { PrismaService } from '@/database/prisma.service'
import { Test, TestingModule } from '@nestjs/testing'
import { vi } from 'vitest'

import { Assignor } from '@/assignors/entities/assignor.entity'
import { AssignorRepository } from '@/assignors/repository/assignor.repository'
import { NotFoundException } from '@nestjs/common'
import { PayableCreateSchema } from './dto/create-payable.dto'
import { PayableService } from './payable.service'
import { PayableRepository } from './repository/payable.repository'

describe('Payable Service Tests', () => {
  let payableService: PayableService
  let payableRepository: PayableRepository
  let assignorRepository: AssignorRepository
  let assignor: Assignor

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PayableService,
        PayableRepository,
        AssignorRepository,
        PrismaService,
      ],
    }).compile()

    payableService = module.get<PayableService>(PayableService)
    payableRepository = module.get<PayableRepository>(PayableRepository)
    assignorRepository = module.get<AssignorRepository>(AssignorRepository)

    assignor = Assignor.create({
      name: 'Jhon Doe',
      document: '123456789102',
      email: 'jhon_doe@example.com',
      phone: '31999999999',
    })
    await assignorRepository.create(assignor)
  })

  it('should be defined', () => {
    expect(payableService).toBeDefined()
  })

  it('should be create an payable', async () => {
    const data: PayableCreateSchema = {
      assignorId: assignor.id,
      value: 1_000,
      emissionDate: new Date().toISOString(),
    }

    vi.spyOn(payableRepository, 'create')

    const result = await payableService.create(data)
    expect(result).toBeDefined()
    expect(payableRepository.create).toHaveBeenCalled()
    expect(result).toEqual(expect.objectContaining({ assignorId: assignor.id }))
  })

  it('should be not create an payable when assignor not exists', async () => {
    const data: PayableCreateSchema = {
      assignorId: 'invalid-id',
      value: 1_000,
      emissionDate: new Date().toISOString(),
    }

    await expect(async () => await payableService.create(data)).rejects.toThrow(
      NotFoundException,
    )
  })

  it('should be cancel an payable', async () => {
    const data: PayableCreateSchema = {
      assignorId: assignor.id,
      value: 1_000,
      emissionDate: new Date().toISOString(),
    }
    const payable = await payableService.create(data)

    const result = await payableService.cancel(payable.id)
    expect(result).toBeDefined()
    expect(result).toEqual(expect.objectContaining({ isCanceled: true }))
  })

  it('should be pay an payable', async () => {
    const data: PayableCreateSchema = {
      assignorId: assignor.id,
      value: 1_000,
      emissionDate: new Date().toISOString(),
    }
    const payable = await payableService.create(data)

    const result = await payableService.pay(payable.id)
    expect(result).toBeDefined()
    expect(result).toEqual(expect.objectContaining({ isPayed: true }))
  })

  it('should be update one payable', async () => {
    const data: PayableCreateSchema = {
      assignorId: assignor.id,
      value: 1_000,
      emissionDate: new Date().toISOString(),
    }
    const payable = await payableService.create(data)

    const result = await payableService.update({ value: 500 }, payable.id)
    expect(result).toBeDefined()
    expect(result).toEqual(expect.objectContaining({ value: 500 }))
  })

  it('should be delete an payable', async () => {
    const data: PayableCreateSchema = {
      assignorId: assignor.id,
      value: 1_000,
      emissionDate: new Date().toISOString(),
    }
    const payable = await payableService.create(data)

    expect(async () => {
      await payableService.destroy(payable.id)
    }).not.toThrow()
  })
})
