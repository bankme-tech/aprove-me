import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import {
  Payable,
  PayableProps,
} from "@/domain/receivables/enterprise/entities/payable";
import { faker } from "@faker-js/faker";

export const makePayable = (
  override: Partial<PayableProps>,
  id?: UniqueEntityId
) => {
  return Payable.create(
    {
      value: Number(faker.commerce.price()),
      emissionDate: faker.date.anytime(),
      assignorId: new UniqueEntityId(),
      ...override,
    },
    id
  );
};
