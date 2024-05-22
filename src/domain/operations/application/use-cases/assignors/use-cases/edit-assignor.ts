import { Either, left, right } from "src/core/either"
import { Assignor } from "../../../../enterprise/entities/assignor"
import { AssignorsRepository } from "../../../repositories/assignor-repository"
import { Injectable } from "@nestjs/common"
import { ResourceNotFoundError } from "../../errors/resource-not-found-error"

interface EditAssignorUseCaseRequest {
  assignorId: string
  document?: string
  email?: string
  phone?: string
  name?: string
}

type EditAssignorUseCaseResponse = Either<
  ResourceNotFoundError,
  Assignor
>

@Injectable()
export class EditAssignorUseCase {
  constructor(private assignorsRepository: AssignorsRepository) {}

  async execute({ assignorId, document, email, phone, name }: EditAssignorUseCaseRequest): Promise<EditAssignorUseCaseResponse> {
    const assignor = await this.assignorsRepository.findById(assignorId)

    if (!assignor) {
      return left(new ResourceNotFoundError())
    }

    if (document) assignor.setDocument(document)
    if (email) assignor.setEmail(email)
    if (phone) assignor.setPhone(phone)
    if (name) assignor.setName(name)

    await this.assignorsRepository.save(assignor)

    return right(assignor)
  }
}