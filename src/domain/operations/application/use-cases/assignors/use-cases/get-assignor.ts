import { Either, right, left } from "src/core/either"
import { Assignor } from "../../../../enterprise/entities/assignor"
import { AssignorsRepository } from "../../../repositories/assignor-repository"
import { Injectable } from "@nestjs/common"
import { ResourceNotFoundError } from "../../errors/resource-not-found-error"

interface GetAssignorUseCaseRequest {
  assignorId: string
}

type GetAssignorUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    assignor: Assignor
  }
>

@Injectable()
export class GetAssignorUseCase {
  constructor(private assignorsRepository: AssignorsRepository) {}

  async execute({ assignorId }: GetAssignorUseCaseRequest): Promise<GetAssignorUseCaseResponse> {
    const assignorIdIsValid = await this.assignorsRepository.findById(assignorId)

    if (!assignorIdIsValid) {
      return left(new ResourceNotFoundError())
    }

    return right({ assignor: assignorIdIsValid })
  }
}