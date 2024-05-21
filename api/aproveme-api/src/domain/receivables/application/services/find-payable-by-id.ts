import { Either, left, right } from "@/core/either";
import { Injectable } from "@nestjs/common";
import { PayablesRepository } from "../repositories/payables-repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { PayableWithAssignor } from "../../enterprise/entities/value-object/payable-with-assignor";

interface FindPayableByIdServiceRequest {
  id: string;
}
type FindPayableByIdServiceResponse = Either<
  ResourceNotFoundError,
  {
    payableWithAssignor: PayableWithAssignor;
  }
>;

@Injectable()
export class FindPayableByIdService {
  constructor(private payablesRepo: PayablesRepository) {}

  async execute({
    id,
  }: FindPayableByIdServiceRequest): Promise<FindPayableByIdServiceResponse> {
    const payableWithAssignor =
      await this.payablesRepo.findWithAssignorById(id);

    if (!payableWithAssignor) return left(new ResourceNotFoundError());

    return right({
      payableWithAssignor,
    });
  }
}
