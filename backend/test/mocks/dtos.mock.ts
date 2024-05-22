import { randomUUID } from 'crypto';
import { InputAssignorDTO } from 'src/assignor/dto/input-assignor.dto';
import { InputPayableDTO } from 'src/payable/dto/input-payable.dto';

export const makeAssignorDTO = (): InputAssignorDTO => ({
  id: randomUUID(),
  document: 'any_document',
  email: 'any_email',
  phone: 'any_phone',
  name: 'any_name',
});

export const makePayableDTO = (): InputPayableDTO => ({
  id: randomUUID(),
  value: 31321.21,
  emissionDate: new Date(),
  assignor: makeAssignorDTO().id,
});
