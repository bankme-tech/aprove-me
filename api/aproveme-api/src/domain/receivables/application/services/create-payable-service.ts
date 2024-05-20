import { Either, right } from "@/core/either";
import { Assignor } from "../../enterprise/entities/assignor";
import { Injectable } from "@nestjs/common";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { PayablesRepository } from "../repositories/payables-repository";
import { Payable } from "../../enterprise/entities/payable";

interface CreatePayableServiceRequest {
  payable: {
    id: string;
    value: number;
    emissionDate: Date;
  };
  assignor: {
    id: string;
    document: string;
    email: string;
    phone: string;
    name: string;
  };
}
type CreatePayableServiceResponse = Either<
  null,
  {
    payable: Payable;
    assignor: Assignor;
  }
>;

@Injectable()
export class CreatePayableService {
  constructor(private payablesRepo: PayablesRepository) {}

  async execute({
    payable,
    assignor,
  }: CreatePayableServiceRequest): Promise<CreatePayableServiceResponse> {
    const assignorEntity = Assignor.create(
      {
        document: assignor.document,
        email: assignor.email,
        phone: assignor.phone,
        name: assignor.name,
      },
      new UniqueEntityId(assignor.id)
    );

    const payableEntity = Payable.create(
      {
        value: payable.value,
        emissionDate: payable.emissionDate,
        assignor: new UniqueEntityId(assignor.id),
      },
      new UniqueEntityId(payable.id)
    );

    await this.payablesRepo.create(payableEntity, assignorEntity);

    return right({
      payable: payableEntity,
      assignor: assignorEntity,
    });
  }
}
