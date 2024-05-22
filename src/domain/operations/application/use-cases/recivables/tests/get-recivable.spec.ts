import { describe, beforeEach, it, expect } from 'vitest'
import { InMemoryRecivableRepository } from 'test/repositories/in-memory-recivable-repository'
import { makeAssignor } from 'test/factories/make-assignor'
import { GetRecivableUseCase } from '../use-cases/get-recivable'
import { makeRecivable } from 'test/factories/make-recivable'

describe('Get Recivable', () => {

  let recivableRepository: InMemoryRecivableRepository
  let sut: GetRecivableUseCase

  beforeEach(() => {
    recivableRepository = new InMemoryRecivableRepository()
    sut = new GetRecivableUseCase(recivableRepository)
  })

  it('should be able to get a recivable with a valid Recivable Id', async () => {
    const assignor = makeAssignor()
    const recivable = makeRecivable(assignor.id.toString())

    await recivableRepository.create(recivable)

    const { value } = await sut.execute({
      recivableId: recivable.id.toString()
    })

    expect(value).toEqual(expect.objectContaining({
      recivable
    }))
  })
})