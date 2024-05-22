import { Either, right } from "src/core/either"
import { Assignor } from "../../../../enterprise/entities/assignor"
import { AssignorsRepository } from "../../../repositories/assignor-repository"
import { Injectable } from "@nestjs/common"

interface CreateAssignorUseCaseRequest {
  document: string
  email: string
  phone: string
  name: string
}

type CreateAssignorUseCaseResponse = Either<
  null,
  {
    assignor: Assignor
  }
>

@Injectable()
export class CreateAssignorUseCase {
  constructor(private assignorsRepository: AssignorsRepository) {}

  async execute({ document, email, phone, name }: CreateAssignorUseCaseRequest): Promise<CreateAssignorUseCaseResponse> {
    const assignor = Assignor.create({
      document,
      email,
      phone,
      name
    })

    await this.assignorsRepository.create(assignor)

    return right({ assignor })
  }
}