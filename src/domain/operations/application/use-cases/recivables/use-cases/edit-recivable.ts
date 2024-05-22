import { Either, left, right } from "src/core/either"
import { Injectable } from "@nestjs/common"
import { ResourceNotFoundError } from "../../errors/resource-not-found-error"
import { RecivableRepository } from "../../../repositories/recebiveis-repository"
import { Recivable } from "../../../../enterprise/entities/recivable"

interface EditRecivableUseCaseRequest {
  recivableId: string
  value?: number
  emissionDate?: Date
  assignorId?: string
}

type EditRecivableUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    recivable: Recivable
  }
>

@Injectable()
export class EditRecivableUseCase {
  constructor(private recivablesRepository: RecivableRepository) {}

  async execute({ recivableId, value, emissionDate, assignorId }: EditRecivableUseCaseRequest): Promise<EditRecivableUseCaseResponse> {
    const recivable = await this.recivablesRepository.findById(recivableId)

    if (!recivable) {
      return left(new ResourceNotFoundError())
    }

    if (value) recivable.setValue(value)
    if (emissionDate) recivable.setEmissionDate(emissionDate)
    if (assignorId) recivable.setAssignor(assignorId)

    await this.recivablesRepository.save(recivable)

    return right({ recivable })
  }
}