import 'reflect-metadata';
import {
  itShouldThrowIfFieldIsEmpty,
  itShouldThrowIfFieldIsNotOfType,
  itShouldValidateSuccessfully,
} from '../../utils/test';
import { UpdatePayableDto } from './update.payable.dto';

describe('UpdatePayableDto', () => {
  const validDto = {
    value: 100,
    emissionDate: new Date(),
    assignor: '9b2cde3e-4e20-4c6b-8f11-4a4b3f3d9148',
  } as UpdatePayableDto;
  itShouldValidateSuccessfully(validDto, UpdatePayableDto);

  itShouldThrowIfFieldIsNotOfType({
    dto: validDto,
    dtoClass: UpdatePayableDto,
    fields: [
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

  itShouldThrowIfFieldIsEmpty({
    dto: validDto,
    dtoClass: UpdatePayableDto,
    keys: ['assignor', 'emissionDate', 'value'],
  });
});
