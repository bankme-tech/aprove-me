import { Either, right, left } from "src/core/either"
import { Injectable } from "@nestjs/common"
import { Recivable } from "../../../../enterprise/entities/recivable"
import { RecivableRepository } from "../../../repositories/recebiveis-repository"
import { ResourceNotFoundError } from "../../errors/resource-not-found-error"
import { AssignorsRepository } from "../../../repositories/assignor-repository"

interface DeleteRecivableUseCaseRequest {
  recivableId: string
}

type DeleteRecivableUseCaseResponse = Either<
  ResourceNotFoundError,
  {}
>

@Injectable()
export class DeleteRecivableUseCase {
  constructor(
    private recivablesRepository: RecivableRepository
  ) {}

  async execute({ recivableId }: DeleteRecivableUseCaseRequest): Promise<DeleteRecivableUseCaseResponse> {
    const isRecivableIdValid = await this.recivablesRepository.findById(recivableId)

    if (!isRecivableIdValid) {
      return left(new ResourceNotFoundError())
    }

    await this.recivablesRepository.delete(isRecivableIdValid.id.toString())

    return right({})
  }
}