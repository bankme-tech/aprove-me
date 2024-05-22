import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryReceivableRepository } from 'test/repositories/in-memory-receivable-repository'
import { CreateReceivableUseCase } from '../use-cases/create-receivable'
import { InMemoryAssignorsRepository } from 'test/repositories/in-memory-assignor-repository'
import { makeAssignor } from 'test/factories/make-assignor'

describe('Create Receivable', () => {
  
  let receivableRepository: InMemoryReceivableRepository
  let assignorsRepository: InMemoryAssignorsRepository
  let sut: CreateReceivableUseCase

  beforeEach(() => {
    receivableRepository = new InMemoryReceivableRepository()
    assignorsRepository = new InMemoryAssignorsRepository()

    sut = new CreateReceivableUseCase(receivableRepository, assignorsRepository)
  })

  it('should be able to create a receivable with a valid Assignor Id', async () => {
    const assignor = makeAssignor()
    await assignorsRepository.create(assignor)

    const { value } = await sut.execute({
      assignorId: assignor.id.toString(),
      emissionDate: new Date(),
      value: 123123
    })

    expect(value).toEqual(expect.objectContaining({
      receivable: expect.any(Object)
    }))
  })
})