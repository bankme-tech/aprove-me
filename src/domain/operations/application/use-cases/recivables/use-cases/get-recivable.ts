import { Either, right, left } from "src/core/either"
import { Injectable } from "@nestjs/common"
import { Recivable } from "../../../../enterprise/entities/recivable"
import { RecivableRepository } from "../../../repositories/recebiveis-repository"
import { ResourceNotFoundError } from "../../errors/resource-not-found-error"

interface GetRecivableUseCaseRequest {
  recivableId: string
}

type GetRecivableUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    recivable: Recivable
  }
>

@Injectable()
export class GetRecivableUseCase {
  constructor(
    private recivablesRepository: RecivableRepository,
  ) {}

  async execute({ recivableId }: GetRecivableUseCaseRequest): Promise<GetRecivableUseCaseResponse> {
    const isRecivableIdValid = await this.recivablesRepository.findById(recivableId)
    
    if (!isRecivableIdValid) {
      return left(new ResourceNotFoundError())
    }

    return right({ recivable: isRecivableIdValid })
  }
}