import Assignor from '../../entity/Assignor';
import AssignorDto from '../../dto/AssignorDto';
import AssignorCreationDto from '../../dto/AssignorCreationDto';

export const assignorToCreationMock = new AssignorCreationDto(
  '99999999999',
  'email@email.com',
  '99999999999',
  'John Doe',
);

export const assignorCreatedMock = new AssignorDto(
  '123456789',
  '99999999999',
  'email@email.com',
  '99999999999',
  'John Doe',
);

export const assignorEntityMock = new Assignor(
  '123456789',
  '99999999999',
  'email@email.com',
  '99999999999',
  'John Doe',
);
