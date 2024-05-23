import { Either, left, right } from "@/core/either";
import { Injectable } from "@nestjs/common";
import { AssignorsRepository } from "../repositories/assignors-repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { Assignor } from "../../enterprise/entities/assignor";

interface FindAssignorByIdServiceRequest {
  id: string;
}
type FindAssignorByIdServiceResponse = Either<
  ResourceNotFoundError,
  {
    assignor: Assignor;
  }
>;

@Injectable()
export class FindAssignorByIdService {
  constructor(private assignorsRepo: AssignorsRepository) {}

  async execute({
    id,
  }: FindAssignorByIdServiceRequest): Promise<FindAssignorByIdServiceResponse> {
    const assignor = await this.assignorsRepo.findById(id);

    if (!assignor) return left(new ResourceNotFoundError());

    return right({
      assignor,
    });
  }
}
