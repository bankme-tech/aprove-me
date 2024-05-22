import 'reflect-metadata';
import {
  itShouldFailIfValueDoesNotMeetRangeCriteria,
  itShouldThrowIfFieldIsEmpty,
  itShouldThrowIfFieldIsNotOfType,
  itShouldValidateSuccessfully,
} from '../../utils/test';
import { UpdateAssignorDto } from './update-assignor.dto';

describe('UpdateAssignorDto', () => {
  const validDto = {
    document: '12345678901234',
    email: 'email@example.com',
    phone: '1234567890',
    name: 'John Doe',
  } as UpdateAssignorDto;

  itShouldValidateSuccessfully(validDto, UpdateAssignorDto);

  itShouldThrowIfFieldIsNotOfType({
    dto: validDto,
    dtoClass: UpdateAssignorDto,
    fields: [
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

  itShouldThrowIfFieldIsEmpty({
    dto: validDto,
    dtoClass: UpdateAssignorDto,
    keys: ['document', 'email', 'phone', 'name'],
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
    dtoClass: UpdateAssignorDto,
  });
});
