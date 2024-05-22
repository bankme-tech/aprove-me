import PayableCreationDto from '../../dto/PayableCreationDto';
import PayableDto from '../../dto/PayableDto';
import Payable from '../../entity/Payable';

export const payableToCreationMock = new PayableCreationDto(
  1000,
  new Date('10-10-2021'),
  '123456789',
);

export const payableCreatedMock = new PayableDto(
  '0987654321',
  1000,
  new Date('10-10-2021'),
  '123456789',
);

export const payableEntityMock = new Payable(
  '0987654321',
  1000,
  new Date('10-10-2021'),
  '123456789',
);
