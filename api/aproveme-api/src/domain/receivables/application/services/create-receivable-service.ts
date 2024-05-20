import { Either, right } from "@/core/either";
import { Receivable } from "../../enterprise/entities/receivable";
import { Assignor } from "../../enterprise/entities/assignor";
import { Injectable } from "@nestjs/common";
import { ReceivablesRepository } from "../repositories/receivables-repository";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";

interface CreateReceivableServiceRequest {
  receivable: {
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
type CreateReceivableServiceResponse = Either<
  null,
  {
    receivable: Receivable;
    assignor: Assignor;
  }
>;

@Injectable()
export class CreateReceivableService {
  constructor(private receivablesRepo: ReceivablesRepository) {}

  async execute({
    receivable,
    assignor,
  }: CreateReceivableServiceRequest): Promise<CreateReceivableServiceResponse> {
    const assignorEntity = Assignor.create(
      {
        document: assignor.document,
        email: assignor.email,
        phone: assignor.phone,
        name: assignor.name,
      },
      new UniqueEntityId(assignor.id)
    );

    const receivableEntity = Receivable.create(
      {
        value: receivable.value,
        emissionDate: receivable.emissionDate,
        assignor: new UniqueEntityId(assignor.id),
      },
      new UniqueEntityId(receivable.id)
    );

    await this.receivablesRepo.create(receivableEntity, assignorEntity);

    return right({
      receivable: receivableEntity,
      assignor: assignorEntity,
    });
  }
}
