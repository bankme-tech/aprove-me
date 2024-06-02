import Assignor from '../../entity/Assignor';
import AssignorDto from '../../dto/AssignorDto';
import AssignorCreationDto from '../../dto/AssignorCreationDto';
import { fakerPT_BR } from '@faker-js/faker';

const uuid = fakerPT_BR.string.uuid();
const document = fakerPT_BR.string.numeric(11);
const email = fakerPT_BR.internet.email();
const password = fakerPT_BR.string.alphanumeric(10);
const phone = fakerPT_BR.string.numeric(11);
const name = fakerPT_BR.person.fullName();

export const assignorToCreationMock = new AssignorCreationDto(
  document,
  email,
  password,
  phone,
  name,
);

export const assignorCreatedMock = new AssignorDto(
  uuid,
  document,
  email,
  password,
  phone,
  name,
);

export const assignorEntityMock = new Assignor(
  uuid,
  document,
  email,
  password,
  phone,
  name,
);
