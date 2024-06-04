import { Either, left, right } from "@/core/either";
import { Injectable } from "@nestjs/common";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { PayablesRepository } from "../repositories/payables-repository";
import { Payable } from "../../enterprise/entities/payable";
import { ResourceNotFoundError } from "@/core/errors/errors/resource-not-found-error";

interface EditPayableServiceRequest {
  id: string;
  value: number;
}
type EditPayableServiceResponse = Either<
  ResourceNotFoundError,
  {
    payable: Payable;
  }
>;

@Injectable()
export class EditPayableService {
  constructor(private payablesRepo: PayablesRepository) {}

  async execute({
    id,
    value,
  }: EditPayableServiceRequest): Promise<EditPayableServiceResponse> {
    const payable = await this.payablesRepo.findByid(id);

    if (!payable) return left(new ResourceNotFoundError());

    payable.value = value;

    await this.payablesRepo.update(payable);

    return right({
      payable,
    });
  }
}
