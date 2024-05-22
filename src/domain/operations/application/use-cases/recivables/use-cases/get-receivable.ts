import { Either, right, left } from "src/core/either"
import { Injectable } from "@nestjs/common"
import { Receivable } from "../../../../enterprise/entities/receivable"
import { ReceivableRepository } from "../../../repositories/receivable-repository"
import { ResourceNotFoundError } from "../../errors/resource-not-found-error"

interface GetReceivableUseCaseRequest {
  receivableId: string
}

type GetReceivableUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    receivable: Receivable
  }
>

@Injectable()
export class GetReceivableUseCase {
  constructor(
    private recivablesRepository: ReceivableRepository,
  ) {}

  async execute({ receivableId }: GetReceivableUseCaseRequest): Promise<GetReceivableUseCaseResponse> {
    const isReceivableIdValid = await this.recivablesRepository.findById(String(receivableId))
    
    console.log(isReceivableIdValid)

    if (!isReceivableIdValid) {
      return left(new ResourceNotFoundError())
    }

    return right({ receivable: isReceivableIdValid })
  }
}