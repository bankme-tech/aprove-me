import { Either, left, right } from "@/core/either";
import { Injectable } from "@nestjs/common";
import { PayablesRepository } from "../repositories/payables-repository";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";
import { Payable } from "../../enterprise/entities/payable";

interface FindPayableByIdServiceRequest {
  id: string;
}
type FindPayableByIdServiceResponse = Either<
  ResourceNotFoundError,
  {
    payable: Payable;
  }
>;

@Injectable()
export class FindPayableByIdService {
  constructor(private payablesRepo: PayablesRepository) {}

  async execute({
    id,
  }: FindPayableByIdServiceRequest): Promise<FindPayableByIdServiceResponse> {
    const payable = await this.payablesRepo.findByid(id);

    if (!payable) return left(new ResourceNotFoundError());

    return right({
      payable,
    });
  }
}
