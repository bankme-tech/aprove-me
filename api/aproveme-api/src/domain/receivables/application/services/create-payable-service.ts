import { Either, right } from "@/core/either";
import { Injectable } from "@nestjs/common";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { PayablesRepository } from "../repositories/payables-repository";
import { Payable } from "../../enterprise/entities/payable";

interface CreatePayableServiceRequest {
  payable: {
    id: string;
    value: number;
    emissionDate: Date;
    assignorId: string;
  };
}
type CreatePayableServiceResponse = Either<
  null,
  {
    payable: Payable;
  }
>;

@Injectable()
export class CreatePayableService {
  constructor(private payablesRepo: PayablesRepository) {}

  async execute({
    payable,
  }: CreatePayableServiceRequest): Promise<CreatePayableServiceResponse> {
    const payableEntity = Payable.create(
      {
        value: payable.value,
        emissionDate: payable.emissionDate,
        assignorId: new UniqueEntityId(payable.assignorId),
      },
      new UniqueEntityId(payable.id)
    );

    await this.payablesRepo.create(payableEntity);

    return right({
      payable: payableEntity,
    });
  }
}
