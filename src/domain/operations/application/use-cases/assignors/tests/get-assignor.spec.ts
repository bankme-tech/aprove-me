import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryAssignorsRepository } from 'test/repositories/in-memory-assignor-repository'
import { GetAssignorUseCase } from '../use-cases/get-assignor'
import { makeAssignor } from 'test/factories/make-assignor'

describe('Get Assignor', () => {
  
  let assignorsRepository: InMemoryAssignorsRepository
  let sut: GetAssignorUseCase

  beforeEach(() => {
    assignorsRepository = new InMemoryAssignorsRepository()
    sut = new GetAssignorUseCase(assignorsRepository)
  })

  it('should be able to get a assignor', async () => {
    const assignor = makeAssignor()
    await assignorsRepository.create(assignor)
    
    const { value } = await sut.execute({
      assignorId: assignor.id.toString()
    })

    expect(value).toEqual(expect.objectContaining({
      assignor
    }))
  })
})