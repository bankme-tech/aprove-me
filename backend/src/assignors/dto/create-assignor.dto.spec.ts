import 'reflect-metadata';
import {
  itShouldFailIfValueDoesNotMeetRangeCriteria,
  itShouldThrowIfFieldIsEmpty,
  itShouldThrowIfFieldIsNotOfType,
  itShouldValidateSuccessfully,
} from '../../utils/test';
import { CreateAssignorDto } from './create-assignor.dto';

describe('CreateAssignorDto', () => {
  const validDto = {
    id: '9b2cde3e-4e20-4c6b-8f11-4a4b3f3d9148',
    document: '12345678901234',
    email: 'test@example.com',
    phone: '1234567890',
    name: 'John Doe',
  };

  itShouldValidateSuccessfully(validDto, CreateAssignorDto);

  itShouldThrowIfFieldIsNotOfType({
    dto: validDto,
    dtoClass: CreateAssignorDto,
    fields: [
      {
        key: 'id',
        type: 'uuid',
      },
      {
        key: 'document',
        type: 'string',
      },
      {
        key: 'email',
        type: 'email',
      },
      {
        key: 'phone',
        type: 'string',
      },
      {
        key: 'name',
        type: 'string',
      },
    ],
  });

  itShouldFailIfValueDoesNotMeetRangeCriteria({
    fields: [
      {
        key: 'document',
        max: 30,
      },
      {
        key: 'email',
        max: 140,
      },
      {
        key: 'name',
        max: 140,
      },
    ],
    dto: validDto,
    dtoClass: CreateAssignorDto,
  });

  itShouldThrowIfFieldIsEmpty({
    dto: validDto,
    dtoClass: CreateAssignorDto,
    keys: ['document', 'email', 'phone', 'name'],
  });
});
