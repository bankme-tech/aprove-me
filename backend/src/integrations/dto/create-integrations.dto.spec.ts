import 'reflect-metadata';
import {
  CreateAssignorDto,
  CreatePayableDto,
  UpdateAssignorDto,
  UpdatePayableDto,
} from './create-integration.dto';
import {
  itShouldFailIfValueDoesNotMeetRangeCriteria,
  itShouldThrowIfFieldIsEmpty,
  itShouldThrowIfFieldIsNotOfType,
  itShouldValidateSuccessfully,
} from '../../utils/test';

describe('CreateIntegrationsDto', () => {
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
  });

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
});
