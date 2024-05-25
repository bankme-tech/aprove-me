import 'reflect-metadata';
import {
  itShouldThrowIfFieldIsNotOfType,
  itShouldValidateSuccessfully,
} from '../../utils/test';
import { CreatePayableDto } from '../../payables/dto/create.payable.dto';

describe('CreatePayableDto', () => {
  const validDto = {
    id: '9b2cde3e-4e20-4c6b-8f11-4a4b3f3d9148',
    value: 100,
    emissionDate: new Date(),
    assignor: '9b2cde3e-4e20-4c6b-8f11-4a4b3f3d9148',
  } as CreatePayableDto;

  itShouldValidateSuccessfully(validDto, CreatePayableDto);

  itShouldThrowIfFieldIsNotOfType({
    dto: validDto,
    dtoClass: CreatePayableDto,
    fields: [
      {
        key: 'id',
        type: 'uuid',
      },
      {
        key: 'assignor',
        type: 'uuid',
      },
      {
        key: 'emissionDate',
        type: 'date',
      },
      {
        key: 'value',
        type: 'number',
      },
    ],
  });
});
