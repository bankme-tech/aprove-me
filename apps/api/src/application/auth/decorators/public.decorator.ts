import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC = '__is_public_key__';

export function Public(): MethodDecorator {
  return SetMetadata(IS_PUBLIC, true);
}
