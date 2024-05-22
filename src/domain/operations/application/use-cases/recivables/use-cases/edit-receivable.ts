import { Either, left, right } from "src/core/either"
import { Injectable } from "@nestjs/common"
import { ResourceNotFoundError } from "../../errors/resource-not-found-error"
import { ReceivableRepository } from "../../../repositories/receivable-repository"
import { Receivable } from "../../../../enterprise/entities/receivable"

interface EditReceivableUseCaseRequest {
  receivableId: string
  value?: number
  emissionDate?: Date
  assignorId?: string
}

type EditReceivableUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    receivable: Receivable
  }
>

@Injectable()
export class EditReceivableUseCase {
  constructor(private receivablesRepository: ReceivableRepository) {}

  async execute({ receivableId, value, emissionDate, assignorId }: EditReceivableUseCaseRequest): Promise<EditReceivableUseCaseResponse> {
    const receivable = await this.receivablesRepository.findById(receivableId)

    if (!receivable) {
      return left(new ResourceNotFoundError())
    }

    if (value) receivable.setValue(value)
    if (emissionDate) receivable.setEmissionDate(emissionDate)
    if (assignorId) receivable.setAssignor(assignorId)

    await this.receivablesRepository.save(receivable)

    return right({ receivable })
  }
}