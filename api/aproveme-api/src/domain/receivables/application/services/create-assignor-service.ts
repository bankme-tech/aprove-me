import { Either, right } from "@/core/either";
import { Assignor } from "../../enterprise/entities/assignor";
import { Injectable } from "@nestjs/common";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AssignorsRepository } from "../repositories/assignors-repository";

interface CreateAssignorServiceRequest {
  assignor: {
    id: string;
    document: string;
    email: string;
    phone: string;
    name: string;
  };
}
type CreateAssignorServiceResponse = Either<
  null,
  {
    assignor: Assignor;
  }
>;

@Injectable()
export class CreateAssignorService {
  constructor(private assignorsRepo: AssignorsRepository) {}

  async execute({
    assignor,
  }: CreateAssignorServiceRequest): Promise<CreateAssignorServiceResponse> {
    const assignorEntity = Assignor.create(
      {
        document: assignor.document,
        email: assignor.email,
        phone: assignor.phone,
        name: assignor.name,
      },
      new UniqueEntityId(assignor.id)
    );

    await this.assignorsRepo.create(assignorEntity);

    return right({
      assignor: assignorEntity,
    });
  }
}
