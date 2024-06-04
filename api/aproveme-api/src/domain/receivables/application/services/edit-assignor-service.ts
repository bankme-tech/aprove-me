import { Either, left, right } from "@/core/either";
import { Injectable } from "@nestjs/common";
import { AssignorsRepository } from "../repositories/assignors-repository";
import { Assignor } from "../../enterprise/entities/assignor";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

interface EditAssignorServiceRequest {
  id: string;
  document?: string;
  email?: string;
  phone?: string;
  name?: string;
}
type EditAssignorServiceResponse = Either<
  ResourceNotFoundError,
  {
    assignor: Assignor;
  }
>;

@Injectable()
export class EditAssignorService {
  constructor(private assignorsRepo: AssignorsRepository) {}

  async execute({
    id,
    document,
    email,
    name,
    phone,
  }: EditAssignorServiceRequest): Promise<EditAssignorServiceResponse> {
    const assignor = await this.assignorsRepo.findById(id);

    if (!assignor) return left(new ResourceNotFoundError());

    assignor.document = document ?? assignor.document;
    assignor.email = email ?? assignor.email;
    assignor.name = name ?? assignor.name;
    assignor.phone = phone ?? assignor.phone;

    await this.assignorsRepo.update(assignor);

    return right({
      assignor,
    });
  }
}
