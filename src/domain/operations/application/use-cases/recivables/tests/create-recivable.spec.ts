import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryRecivableRepository } from 'test/repositories/in-memory-recivable-repository'
import { CreateRecivableUseCase } from '../use-cases/create-recivable'
import { InMemoryAssignorsRepository } from 'test/repositories/in-memory-assignor-repository'
import { makeAssignor } from 'test/factories/make-assignor'

describe('Create Recivable', () => {
  
  let recivableRepository: InMemoryRecivableRepository
  let assignorsRepository: InMemoryAssignorsRepository
  let sut: CreateRecivableUseCase

  beforeEach(() => {
    recivableRepository = new InMemoryRecivableRepository()
    assignorsRepository = new InMemoryAssignorsRepository()

    sut = new CreateRecivableUseCase(recivableRepository, assignorsRepository)
  })

  it('should be able to create a recivable with a valid Assignor Id', async () => {
    const assignor = makeAssignor()
    await assignorsRepository.create(assignor)

    const { value } = await sut.execute({
      assignorId: assignor.id.toString(),
      emissionDate: new Date(),
      value: 123123
    })

    expect(value).toEqual(expect.objectContaining({
      recivable: expect.any(Object)
    }))
  })
})