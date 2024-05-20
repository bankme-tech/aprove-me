import { Either, left, right } from "@/core/either";
import { Injectable } from "@nestjs/common";
import { Assignor } from "../../enterprise/entities/assignor";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { AssignorsRepository } from "../repositories/assignors-repository";

interface RemoveAssignorServiceRequest {
  id: string;
}
type RemoveAssignorServiceResponse = Either<
  ResourceNotFoundError,
  {
    assignor: Assignor;
  }
>;

@Injectable()
export class RemoveAssignorService {
  constructor(private assignorsRepo: AssignorsRepository) {}

  async execute({
    id,
  }: RemoveAssignorServiceRequest): Promise<RemoveAssignorServiceResponse> {
    const assignor = await this.assignorsRepo.findById(id);

    if (!assignor) return left(new ResourceNotFoundError());

    await this.assignorsRepo.delete(assignor);

    return right({
      assignor,
    });
  }
}
