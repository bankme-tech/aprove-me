import { CreateAssignorInputDTO } from 'src/assignor/dto/create-assignor.input.dto';
import { CreatePayableInputDTO } from 'src/payable/dto/create-payable.input.dto';
import { makeAssignorEntity } from './entities/assignor.entity.mock';
import { faker } from '@faker-js/faker';
import { AuthInputDTO } from 'src/auth/dto/auth.input.dto';
import { CreateUserInputDTO } from 'src/user/dto/create-user.input.dto';
import { BatchInputDTO } from 'src/payable/dto/batch.input.dto';

export const makeAssignorDTO = (): CreateAssignorInputDTO => ({
  document: faker.string.numeric(20),
  email: faker.string.alpha(130),
  phone: faker.string.alpha(18),
  name: faker.string.alpha(130),
});

export const makePayableDTO = (): CreatePayableInputDTO => ({
  value: faker.number.float({
    min: 0,
    max: 10000,
    multipleOf: 0.01,
  }),
  emissionDate: faker.date.recent(),
  assignorId: makeAssignorEntity().id,
});

export const makeAuthDTO = (): AuthInputDTO => ({
  login: faker.string.alpha({
    length: 20,
  }),
  password: faker.string.alpha({
    length: 20,
  }),
});

export const makeUserDTO = (): CreateUserInputDTO => makeAuthDTO();

export const makeBatchInputDTO = (
  { min = 1, max = 1000 } = {
    min: 1,
    max: 1000,
  },
): BatchInputDTO => {
  const size = faker.number.int({
    min,
    max,
  });

  const batch = {
    payables: Array.from({ length: size }, makePayableDTO),
  };

  return batch;
};
