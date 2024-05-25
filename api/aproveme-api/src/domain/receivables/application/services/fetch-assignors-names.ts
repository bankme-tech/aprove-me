import { Either, right } from "@/core/either";
import { Injectable } from "@nestjs/common";
import { AssignorName } from "../../enterprise/entities/value-object/assignor-name";
import { AssignorsRepository } from "../repositories/assignors-repository";

interface FetchAssignorsNamesServiceRequest {}

type FetchAssignorsNamesServiceResponse = Either<
  null,
  {
    assignorsNames: AssignorName[];
  }
>;

@Injectable()
export class FetchAssignorsNamesService {
  constructor(private assignorsRepo: AssignorsRepository) {}

  async execute(): Promise<FetchAssignorsNamesServiceResponse> {
    const assignorsNames = await this.assignorsRepo.findManyNames();

    return right({
      assignorsNames,
    });
  }
}
