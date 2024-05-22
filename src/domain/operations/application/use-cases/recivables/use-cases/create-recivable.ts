import { Either, right, left } from "src/core/either"
import { Injectable } from "@nestjs/common"
import { Recivable } from "../../../../enterprise/entities/recivable"
import { RecivableRepository } from "../../../repositories/recebiveis-repository"
import { AssignorsRepository } from "../../../repositories/assignor-repository"
import { ResourceNotFoundError } from "../../errors/resource-not-found-error"

interface CreateRecivableUseCaseRequest {
  value: number
  emissionDate: Date
  assignorId: string
}

type CreateRecivableUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    recivable: Recivable
  }
>

@Injectable()
export class CreateRecivableUseCase {
  constructor(
    private recivablesRepository: RecivableRepository,
    private assignorsRepository: AssignorsRepository
  ) {}

  async execute({ value, emissionDate, assignorId }: CreateRecivableUseCaseRequest): Promise<CreateRecivableUseCaseResponse> {
    const isAssignorIdValid = await this.assignorsRepository.findById(assignorId)
    
    if (!isAssignorIdValid) {
      return left(new ResourceNotFoundError())
    }

    const recivable = Recivable.create({
      value,
      emissionDate,
      assignor: assignorId
    })

    await this.recivablesRepository.create(recivable)

    return right({ recivable })
  }
}