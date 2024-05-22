import { Either, right, left } from "src/core/either"
import { ResourceNotFoundError } from "../../errors/resource-not-found-error"
import { AssignorsRepository } from "../../../repositories/assignor-repository"
import { Injectable } from "@nestjs/common"
import { ReceivableRepository } from "../../../repositories/receivable-repository"

interface DeleteAssignorUseCaseRequest {
  assignorId: string
}

type DeleteCedenteUseCaseResponse = Either<
  ResourceNotFoundError | Error
  , 
  {}
>

@Injectable()
export class DeleteAssignorUseCase {
  constructor(
    private assignorsRepository: AssignorsRepository,
    private receivableRepository: ReceivableRepository
  ) {}

  async execute({ assignorId }: DeleteAssignorUseCaseRequest): Promise<DeleteCedenteUseCaseResponse> {
    const assignor = await this.assignorsRepository.findById(assignorId);

    if (!assignor) {
      return left(new ResourceNotFoundError());
    }

    const receivablesWithAssignorId = await this.receivableRepository.findByAssignorId(assignor.id.toString());

    if (receivablesWithAssignorId.length > 0) {
      return left(new Error('Cannot delete Assignor with Receivables'));
    }

    await this.assignorsRepository.delete(assignorId);

    return right({});
  }
}
