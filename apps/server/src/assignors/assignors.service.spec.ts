import { PrismaService } from '@/database/prisma.service'
import { Test, TestingModule } from '@nestjs/testing'
import { vi } from 'vitest'
import { AssignorsService } from './assignors.service'
import { AssignorCreateSchema } from './dto/create.assignor'
import { AssignorRepository } from './repository/assignor.repository'

describe('Assignor Service Tests', () => {
  let assignorService: AssignorsService
  let assignorRepository: AssignorRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AssignorsService, AssignorRepository, PrismaService],
    }).compile()

    assignorService = module.get<AssignorsService>(AssignorsService)
    assignorRepository = module.get<AssignorRepository>(AssignorRepository)
  })

  it('should be defined', () => {
    expect(assignorService).toBeDefined()
  })

  it('should be create an assignor', async () => {
    const data: AssignorCreateSchema = {
      name: 'Jhon Doe',
      document: '123456789102',
      email: 'jhon_doe@example.com',
      phone: '31999999999',
    }

    vi.spyOn(assignorRepository, 'create')

    const result = await assignorService.create(data)
    expect(result).toBeDefined()
    expect(assignorRepository.create).toHaveBeenCalled()
    expect(result).toEqual(expect.objectContaining({ name: data.name }))
  })

  it('should be return one assignor', async () => {
    const data: AssignorCreateSchema = {
      name: 'Jhon Doe',
      document: '123456789102',
      email: 'jhon_doe@example.com',
      phone: '31999999999',
    }

    const assignorCreate = await assignorService.create(data)

    vi.spyOn(assignorRepository, 'findById')

    const result = await assignorService.findOne(assignorCreate.id)

    expect(result).toBeDefined()
    expect(result).toEqual(expect.objectContaining({ name: data.name }))
    expect(assignorRepository.findById).toHaveBeenCalled()
  })

  it('should be not return an assignor when not exists', async () => {
    const result = await assignorService.findOne('invalid-id')
    expect(result).toBeNull()
  })
})
