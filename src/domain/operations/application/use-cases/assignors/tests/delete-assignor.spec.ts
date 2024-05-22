import { describe, beforeEach, it, expect } from 'vitest'
import { DeleteAssignorUseCase } from '../use-cases/delete-assignor'
import { ResourceNotFoundError } from '../../errors/resource-not-found-error'
import { InMemoryAssignorsRepository } from 'test/repositories/in-memory-assignor-repository'
import { makeAssignor } from 'test/factories/make-assignor'



describe('Delete Assignor', () => {
  
  let assignorsRepository: InMemoryAssignorsRepository
  let sut: DeleteAssignorUseCase

  beforeEach(() => {
    assignorsRepository = new InMemoryAssignorsRepository()
    sut = new DeleteAssignorUseCase(assignorsRepository)
  })

  it('should be able to delete a assignor', async () => {
    const assignor = makeAssignor()

    await assignorsRepository.create(assignor)

    const result = await sut.execute({
      assignorId: assignor.id.toString()
    })

    expect(result.isRight()).toBe(true)
  })

  it('should not be able to delete a assignor not created', async () => {
    const result = await sut.execute({
      assignorId: 'id-123-123-123-123'
    })
    
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })
})