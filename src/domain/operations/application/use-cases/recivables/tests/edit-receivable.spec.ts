import { describe, beforeEach, it, expect } from 'vitest'
import { makeAssignor } from 'test/factories/make-assignor'
import { EditReceivableUseCase } from '../use-cases/edit-receivable'
import { makeReceivable } from 'test/factories/make-receivable'
import { InMemoryReceivableRepository } from 'test/repositories/in-memory-receivable-repository'

describe('Edit Receivable', () => {
  
  let receivableRepository: InMemoryReceivableRepository
  let sut: EditReceivableUseCase

  beforeEach(() => {
    receivableRepository = new InMemoryReceivableRepository()
    sut = new EditReceivableUseCase(receivableRepository)
  })

  it('should be able to edit a receivable', async () => {
    const assignor = makeAssignor()
    const receivable = makeReceivable(assignor.id.toString())

    await receivableRepository.create(receivable)

    const { isRight } = await sut.execute({
      receivableId: receivable.id.toString(),
      value: 9876
    })

    expect(isRight).toBeTruthy()
  })

  it('should not be able to edit a receivable with an invalid id', async () => {
    const { isLeft } = await sut.execute({
      receivableId: '123-123-123',
      value: 9876
    })

    expect(isLeft).toBeTruthy()
  })
})