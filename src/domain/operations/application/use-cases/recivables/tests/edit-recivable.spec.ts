import { describe, beforeEach, it, expect } from 'vitest'
import { makeAssignor } from 'test/factories/make-assignor'
import { InMemoryRecivableRepository } from 'test/repositories/in-memory-recivable-repository'
import { EditRecivableUseCase } from '../use-cases/edit-recivable'
import { makeRecivable } from 'test/factories/make-recivable'

describe('Edit Recivable', () => {
  
  let recivableRepository: InMemoryRecivableRepository
  let sut: EditRecivableUseCase

  beforeEach(() => {
    recivableRepository = new InMemoryRecivableRepository()
    sut = new EditRecivableUseCase(recivableRepository)
  })

  it('should be able to edit a recivable', async () => {
    const assignor = makeAssignor()
    const recivable = makeRecivable(assignor.id.toString())

    await recivableRepository.create(recivable)

    const { isRight } = await sut.execute({
      recivableId: recivable.id.toString(),
      value: 9876
    })

    expect(isRight).toBeTruthy()
  })

  it('should not be able to edit a recivable with an invalid id', async () => {
    const { isLeft } = await sut.execute({
      recivableId: '123-123-123',
      value: 9876
    })

    expect(isLeft).toBeTruthy()
  })
})