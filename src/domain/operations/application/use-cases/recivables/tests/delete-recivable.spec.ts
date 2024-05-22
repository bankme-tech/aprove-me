import { describe, beforeEach, it, expect } from 'vitest'
import { DeleteAssignorUseCase } from '../../assignors/use-cases/delete-assignor'
import { InMemoryAssignorsRepository } from 'test/repositories/in-memory-assignor-repository'
import { makeAssignor } from 'test/factories/make-assignor'
import { DeleteRecivableUseCase } from '../use-cases/delete-recivable'
import { InMemoryRecivableRepository } from 'test/repositories/in-memory-recivable-repository'
import { makeRecivable } from 'test/factories/make-recivable'

describe('Delete Recivable', () => {
  
  let recivablesRepository: InMemoryRecivableRepository
  let assignorsRepository: InMemoryAssignorsRepository
  let sut: DeleteRecivableUseCase

  beforeEach(() => {
    recivablesRepository = new InMemoryRecivableRepository()
    assignorsRepository = new InMemoryAssignorsRepository()
    sut = new DeleteRecivableUseCase(recivablesRepository)
  })

  it('should be able to delete a recivable', async () => {
    const assignor = makeAssignor()
    const recivable = makeRecivable(assignor.id.toString())
    
    await recivablesRepository.create(recivable)

    const result = await sut.execute({
      recivableId: recivable.id.toString()
    })

    expect(result.isRight()).toBe(true)
  })
})