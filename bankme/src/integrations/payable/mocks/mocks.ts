import { RequestWithUser } from 'src/integrations/types';
import PayableCreationDto from '../../dto/PayableCreationDto';
import PayableDto from '../../dto/PayableDto';
import Payable from '../../entity/Payable';
import { fakerPT_BR } from '@faker-js/faker';
import { assignorEntityMock } from '../../assignor/mocks/mock';

const payableUUID = fakerPT_BR.string.uuid();
const value = fakerPT_BR.number.int(1000);
const assignorUUID = assignorEntityMock.id;
const emissionDate = fakerPT_BR.date.past();

export const payableToCreationMock = new PayableCreationDto(
  value,
  emissionDate,
  assignorUUID,
);

export const payableCreatedMock = new PayableDto(
  payableUUID,
  value,
  emissionDate,
  assignorUUID,
);

export const payableEntityMock = new Payable(
  payableUUID,
  value,
  emissionDate,
  assignorUUID,
);

export const req = {
  user: {
    sub: fakerPT_BR.internet.email(),
    username: fakerPT_BR.person.firstName(),
  },
} as RequestWithUser;
