import { SetMetadata } from '@nestjs/common';

export const SKIP_JWT = '__skip_jwt__';

export function SkipJwt(): MethodDecorator {
  return SetMetadata(SKIP_JWT, true);
}
