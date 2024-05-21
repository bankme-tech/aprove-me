import { UniqueEntityId } from "@/core/entities/unique-entity-id";
import { User, UserProps } from "@/domain/account/enterprise/entities/user";
import { faker } from "@faker-js/faker";

export const makeUser = (override: Partial<UserProps>, id?: UniqueEntityId) => {
  return User.create(
    {
      login: faker.internet.userName(),
      password: faker.internet.password(),
      ...override,
    },
    id
  );
};
