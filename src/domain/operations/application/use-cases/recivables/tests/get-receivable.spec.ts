import { describe, beforeEach, it, expect } from 'vitest'
import { makeAssignor } from 'test/factories/make-assignor'
import { GetReceivableUseCase } from '../use-cases/get-receivable'
import { InMemoryReceivableRepository } from 'test/repositories/in-memory-receivable-repository'
import { makeReceivable } from 'test/factories/make-receivable'

describe('Get Receivable', () => {

  let receivableRepository: InMemoryReceivableRepository
  let sut: GetReceivableUseCase

  beforeEach(() => {
    receivableRepository = new InMemoryReceivableRepository()
    sut = new GetReceivableUseCase(receivableRepository)
  })

  it('should be able to get a receivable with a valid Receivable Id', async () => {
    const assignor = makeAssignor()
    const receivable = makeReceivable(assignor.id.toString())

    await receivableRepository.create(receivable)

    const { value } = await sut.execute({
      receivableId: receivable.id.toString()
    })


    expect(value).toEqual(expect.objectContaining({
      receivable
    }))
  })
})