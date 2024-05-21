import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export function CurrentUser(): ParameterDecorator {
  return createParamDecorator((_: unknown, context: ExecutionContext) => {
    return context.switchToHttp().getRequest().user;
  })();
}
