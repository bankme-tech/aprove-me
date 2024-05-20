import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
  Assignor,
  AssignorProps,
} from "@/domain/receivables/enterprise/entities/assignor";

import { faker } from "@faker-js/faker";
import fakerBr from "faker-br";

export const makeAssignor = (
  override: Partial<AssignorProps>,
  id?: UniqueEntityId
) => {
  return Assignor.create(
    {
      document: fakerBr.br.cpf(),
      email: faker.internet.email(),
      name: faker.person.fullName(),
      phone: faker.phone.number(),
      ...override,
    },
    id
  );
};
