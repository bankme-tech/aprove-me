import { ZodValidationPipe } from './zod-validation.pipe';
import { z } from 'zod';

describe('ZodValidationPipe', () => {
  it('should be defined', () => {
    expect(new ZodValidationPipe(z.any())).toBeDefined();
  });
});
