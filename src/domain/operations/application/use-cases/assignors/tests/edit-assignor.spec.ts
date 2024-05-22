import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryAssignorsRepository } from 'test/repositories/in-memory-assignor-repository'
import { EditAssignorUseCase } from '../use-cases/edit-assignor'
import { makeAssignor } from 'test/factories/make-assignor'

describe('Edit Assignor', () => {
  
  let assignorsRepository: InMemoryAssignorsRepository
  let sut: EditAssignorUseCase

  beforeEach(() => {
    assignorsRepository = new InMemoryAssignorsRepository()
    sut = new EditAssignorUseCase(assignorsRepository)
  })

  it('should be able to edit a assignor', async () => {
    const assignor = makeAssignor()
    await assignorsRepository.create(assignor)

    const { value } = await sut.execute({
      assignorId: assignor.id.toString(),
      name: 'Jane Doe'
    })

    expect(value.name).toEqual('Jane Doe')
  })
})