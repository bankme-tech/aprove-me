import { Either, left, right } from "@/core/either";
import { Assignor } from "../../enterprise/entities/assignor";
import { Injectable } from "@nestjs/common";
import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { AssignorsRepository } from "../repositories/assignors-repository";
import { AssignorAlreadyExistsError } from "./errors/assignor-already-exists-error";

interface CreateAssignorServiceRequest {
  assignor: {
    document: string;
    email: string;
    phone: string;
    name: string;
  };
}
type CreateAssignorServiceResponse = Either<
  AssignorAlreadyExistsError,
  {
    assignor: Assignor;
  }
>;

@Injectable()
export class CreateAssignorService {
  constructor(private assignorsRepo: AssignorsRepository) {}

  async execute({
    assignor,
  }: CreateAssignorServiceRequest): Promise<CreateAssignorServiceResponse> {
    const existingAssignorDocument = await this.assignorsRepo.findByDocument(
      assignor.document
    );

    const existingAssignorEmail = await this.assignorsRepo.findByEmail(
      assignor.email
    );

    // Verifica se o assignor com documento existe, mas o e-mail é diferente
    if (existingAssignorDocument && !existingAssignorEmail) {
      return left(new AssignorAlreadyExistsError(assignor.document));
    }

    //Verifica se o assignor com documento não existe, mas existe um com o email enviado.
    if (!existingAssignorDocument && existingAssignorEmail) {
      return left(new AssignorAlreadyExistsError(assignor.email));
    }

    // Se é exatamente o mesmo documento e o mesmo email, retorna o existente.
    if (
      existingAssignorDocument &&
      existingAssignorEmail.email === existingAssignorDocument.email
    ) {
      return right({ assignor: existingAssignorDocument });
    }

    // Caso não exista o documento nem o email, cria um assignor novo.
    const assignorEntity = Assignor.create(
      {
        document: assignor.document,
        email: assignor.email,
        phone: assignor.phone,
        name: assignor.name,
      },
      new UniqueEntityId()
    );

    await this.assignorsRepo.create(assignorEntity);

    return right({
      assignor: assignorEntity,
    });
  }
}
