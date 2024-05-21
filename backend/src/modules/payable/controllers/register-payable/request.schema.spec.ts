import { ArgumentMetadata, ValidationPipe } from '@nestjs/common';
import { RegisterPayableRequestSchema } from './request.schema';

describe('RegisterPayableRequestSchema', () => {
  let target: ValidationPipe;
  let metadata: ArgumentMetadata;

  beforeEach(async () => {
    target = new ValidationPipe({
      transform: true,
      whitelist: true,
    });

    metadata = {
      type: 'body',
      metatype: RegisterPayableRequestSchema,
      data: '',
    };
  });

  it('should not validate empty entry', async () => {
    const result = target.transform(<RegisterPayableRequestSchema>{}, metadata);

    expect(result).rejects.toThrow();

    await result.catch((err) => {
      expect(err.getResponse().message).toEqual(
        expect.arrayContaining(['you must provide a value.']),
      );

      expect(err.getResponse().message).toEqual(
        expect.arrayContaining(['you must provide an emissionDate.']),
      );

      expect(err.getResponse().message).toEqual(
        expect.arrayContaining(['you must provide an assignor.']),
      );
    });
  });
});
