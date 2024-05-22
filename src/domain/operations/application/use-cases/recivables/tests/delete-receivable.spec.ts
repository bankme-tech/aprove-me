import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryAssignorsRepository } from 'test/repositories/in-memory-assignor-repository'
import { makeAssignor } from 'test/factories/make-assignor'
import { DeleteReceivableUseCase } from '../use-cases/delete-receivable'
import { InMemoryReceivableRepository } from 'test/repositories/in-memory-receivable-repository'
import { makeReceivable } from 'test/factories/make-receivable'

describe('Delete Receivable', () => {
  
  let recivablesRepository: InMemoryReceivableRepository
  let assignorsRepository: InMemoryAssignorsRepository
  let sut: DeleteReceivableUseCase

  beforeEach(() => {
    recivablesRepository = new InMemoryReceivableRepository()
    assignorsRepository = new InMemoryAssignorsRepository()
    sut = new DeleteReceivableUseCase(recivablesRepository)
  })

  it('should be able to delete a receivable', async () => {
    const assignor = makeAssignor()
    const receivable = makeReceivable(assignor.id.toString())
    
    await recivablesRepository.create(receivable)

    const result = await sut.execute({
      receivableId: receivable.id.toString()
    })

    expect(result.isRight()).toBe(true)
  })
})