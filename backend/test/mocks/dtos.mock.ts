import { randomUUID } from 'crypto';
import { CreateAssignorInputDTO } from 'src/assignor/dto/create-assignor.input.dto';
import { CreatePayableInputDTO } from 'src/payable/dto/create-payable.input.dto';
import { makeAssignorEntity } from './entities/assignor.entity.mock';
import { faker } from '@faker-js/faker';

export const makeAssignorDTO = (): CreateAssignorInputDTO => ({
  document: faker.string.numeric(20),
  email: faker.string.alpha(130),
  phone: faker.string.alpha(18),
  name: faker.string.alpha(130),
});

export const makePayableDTO = (): CreatePayableInputDTO => ({
  id: randomUUID(),
  value: faker.number.float({
    min: 0,
    max: 10000,
    multipleOf: 0.01,
  }),
  emissionDate: faker.date.recent(),
  assignorId: makeAssignorEntity().id,
});
