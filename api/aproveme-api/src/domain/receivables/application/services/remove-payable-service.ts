import { Either, left, right } from "@/core/either";
import { Injectable } from "@nestjs/common";
import { PayablesRepository } from "../repositories/payables-repository";
import { Payable } from "../../enterprise/entities/payable";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

interface RemovePayableServiceRequest {
  id: string;
}
type RemovePayableServiceResponse = Either<
  ResourceNotFoundError,
  {
    payable: Payable;
  }
>;

@Injectable()
export class RemovePayableService {
  constructor(private payablesRepo: PayablesRepository) {}

  async execute({
    id,
  }: RemovePayableServiceRequest): Promise<RemovePayableServiceResponse> {
    const payable = await this.payablesRepo.findByid(id);

    if (!payable) return left(new ResourceNotFoundError());

    await this.payablesRepo.delete(payable);

    return right({
      payable,
    });
  }
}
