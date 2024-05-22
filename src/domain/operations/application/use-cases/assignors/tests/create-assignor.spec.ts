import { describe, beforeEach, it, expect } from 'vitest'
import { CreateAssignorUseCase } from '../use-cases/create-assignor'
import { InMemoryAssignorsRepository } from 'test/repositories/in-memory-assignor-repository'

describe('Create Assignor', () => {
  
  let assignorsRepository: InMemoryAssignorsRepository
  let sut: CreateAssignorUseCase

  beforeEach(() => {
    assignorsRepository = new InMemoryAssignorsRepository()
    sut = new CreateAssignorUseCase(assignorsRepository)
  })

  it('should be able to create a assignor', async () => {
    const { value } = await sut.execute({
      document: 'document',
      email: 'johndoe@example.com',
      phone: '1199999999',
      name: 'John Doe'
    })

    expect(value.assignor.id).toBeTruthy()
  })
})