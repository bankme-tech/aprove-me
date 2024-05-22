import { Either, right, left } from "src/core/either"
import { ResourceNotFoundError } from "../../errors/resource-not-found-error"
import { AssignorsRepository } from "../../../repositories/assignor-repository"

interface DeleteAssignorUseCaseRequest {
  assignorId: string
}

type DeleteCedenteUseCaseResponse = Either<ResourceNotFoundError, {}>

export class DeleteAssignorUseCase {
  constructor(private assignorsRepository: AssignorsRepository) {}

  async execute({ assignorId }: DeleteAssignorUseCaseRequest): Promise<DeleteCedenteUseCaseResponse> {
    const assignor = await this.assignorsRepository.findById(assignorId)

    if (!assignor) {
      return left(new ResourceNotFoundError())
    }

    await this.assignorsRepository.delete(assignorId)

    return right({})
  }
}