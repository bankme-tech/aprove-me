import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export const itShouldValidateSuccessfully = (dto: any, dtoClass: any) => {
  it('should validate successfully with valid data', async () => {
    const dtoToValidate = plainToInstance(dtoClass, dto);

    const errors = validateSync(dtoToValidate);
    expect(errors.length).toBe(0);
  });
};

export const itShouldThrowIfFieldIsEmpty = ({
  keys,
  dto,
  dtoClass,
}: {
  keys: string[];
  dto: any;
  dtoClass: any;
}) => {
  for (const key of keys) {
    it(`should fail if ${key} is empty`, async () => {
      const dtoToValidate = plainToInstance(dtoClass, {
        ...dto,
        [key]: undefined,
      });

      const errors = validateSync(dtoToValidate);
      expect(errors.length).toBeGreaterThan(0);
    });
  }
};

type KeyType =
  | 'number'
  | 'string'
  | 'boolean'
  | 'date'
  | 'uuid'
  | 'email'
  | 'enum';

export const itShouldThrowIfFieldIsNotOfType = <T>({
  fields,
  dto,
  dtoClass,
}: {
  fields: { key: keyof T; type: KeyType }[];
  dto: Partial<T>;
  dtoClass: new () => T;
}) => {
  const keyTypeCases: Record<KeyType, any> = {
    number: 'invalid',
    string: 123,
    boolean: 123,
    date: undefined,
    uuid: 123,
    email: 123,
    enum: 'invalid',
  };
  for (const field of fields) {
    if (!Object.keys(dto).includes(String(field.key))) {
      throw new Error(`Field ${String(field.key)} not found in dto`);
    }
    it(`should fail if ${String(field.key).toUpperCase()} is not of type ${field.type.toUpperCase()}`, () => {
      const dtoToValidate = plainToInstance(dtoClass, {
        ...dto,
        [field.key]: keyTypeCases[field.type],
      });

      const errors = validateSync(dtoToValidate as any);
      expect(errors.length).toBeGreaterThan(0);
    });
  }
};

/**
 * @param fields the key value must be a number or string
 */
export const itShouldFailIfValueDoesNotMeetRangeCriteria = <T>({
  fields,
  dto,
  dtoClass,
}: {
  fields: {
    key: keyof T;
    min?: number;
    max?: number;
  }[];
  dto: Partial<T>;
  dtoClass: new () => T;
}) => {
  for (const field of fields) {
    if (!Object.keys(dto).includes(String(field.key))) {
      throw new Error(`Field ${String(field.key)} not found in dto`);
    }

    if (!field.min && !field.max) {
      throw new Error(
        `Field ${String(field.key)} does not have min or max value`,
      );
    }

    const fieldType = typeof dto[field.key];
    if (fieldType !== 'number' && fieldType !== 'string') {
      throw new Error(`Field ${String(field.key)} is not a number or string`);
    }

    if (fieldType === 'number') {
      if (field.min) {
        it(`should fail if ${String(field.key).toUpperCase()} is not greater than ${field.min}`, () => {
          const dtoToValidate = plainToInstance(dtoClass, {
            ...dto,
            [field.key]: field.min - 1,
          });

          const errors = validateSync(dtoToValidate as any);
          expect(errors.length).toBeGreaterThan(0);
        });
      }

      if (field.max) {
        it(`should fail if ${String(field.key).toUpperCase()} is bigger than ${field.max}`, () => {
          const dtoToValidate = plainToInstance(dtoClass, {
            ...dto,
            [field.key]: field.max + 1,
          });

          const errors = validateSync(dtoToValidate as any);
          expect(errors.length).toBeGreaterThan(0);
        });
      }
    } else {
      // fieldType === 'string'
      if (field.min) {
        it(`should fail if ${String(field.key).toUpperCase()} is not greater than ${field.min} characters`, () => {
          const dtoToValidate = plainToInstance(dtoClass, {
            ...dto,
            [field.key]: 'a'.repeat(field.min - 1),
          });

          const errors = validateSync(dtoToValidate as any);
          expect(errors.length).toBeGreaterThan(0);
        });
      }

      if (field.max) {
        it(`should fail if ${String(field.key).toUpperCase()} is bigger than ${field.max} characters`, () => {
          const dtoToValidate = plainToInstance(dtoClass, {
            ...dto,
            [field.key]: 'a'.repeat(field.max + 1),
          });

          const errors = validateSync(dtoToValidate as any);
          expect(errors.length).toBeGreaterThan(0);
        });
      }
    }
  }
};
