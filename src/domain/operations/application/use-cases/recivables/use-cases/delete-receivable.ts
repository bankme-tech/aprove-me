import { Either, right, left } from "src/core/either"
import { Injectable } from "@nestjs/common"
import { ReceivableRepository } from "../../../repositories/receivable-repository"
import { ResourceNotFoundError } from "../../errors/resource-not-found-error"

interface DeleteReceivableUseCaseRequest {
  receivableId: string
}

type DeleteReceivableUseCaseResponse = Either<
  ResourceNotFoundError,
  {}
>

@Injectable()
export class DeleteReceivableUseCase {
  constructor(
    private receivablesRepository: ReceivableRepository
  ) {}

  async execute({ receivableId }: DeleteReceivableUseCaseRequest): Promise<DeleteReceivableUseCaseResponse> {
    const isReceivableIdValid = await this.receivablesRepository.findById(receivableId)

    if (!isReceivableIdValid) {
      return left(new ResourceNotFoundError())
    }

    await this.receivablesRepository.delete(isReceivableIdValid.id.toString())

    return right({})
  }
}