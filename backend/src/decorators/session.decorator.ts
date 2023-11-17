import {
  ExecutionContext,
  NotFoundException,
  createParamDecorator,
} from '@nestjs/common';

export const Session = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    if (!request.session) {
      throw new NotFoundException('User not found');
    }
    return request.session;
  },
);
