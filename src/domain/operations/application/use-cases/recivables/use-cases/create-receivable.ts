import { Either, right, left } from "src/core/either"
import { Injectable } from "@nestjs/common"
import { AssignorsRepository } from "../../../repositories/assignor-repository"
import { ResourceNotFoundError } from "../../errors/resource-not-found-error"
import { ReceivableRepository } from "../../../repositories/receivable-repository"
import { Receivable } from "src/domain/operations/enterprise/entities/receivable"

interface CreateReceivableUseCaseRequest {
  value: number
  emissionDate: Date
  assignorId: string
}

type CreateReceivableUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    receivable: Receivable
  }
>

@Injectable()
export class CreateReceivableUseCase {
  constructor(
    private receivablesRepository: ReceivableRepository,
    private assignorsRepository: AssignorsRepository
  ) {}

  async execute({ value, emissionDate, assignorId }: CreateReceivableUseCaseRequest): Promise<CreateReceivableUseCaseResponse> {
    const isAssignorIdValid = await this.assignorsRepository.findById(assignorId)
    
    if (!isAssignorIdValid) {
      return left(new ResourceNotFoundError())
    }

    const receivable = Receivable.create({
      value,
      emissionDate,
      assignor: assignorId
    })

    await this.receivablesRepository.create(receivable)

    return right({ receivable })
  }
}