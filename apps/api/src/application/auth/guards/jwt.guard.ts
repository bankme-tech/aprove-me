import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

import { none, some, IEither, right, left } from '@bankme/monads';
import { EnvService } from '@bankme/nestjs-env';

import { Id } from '@bankme/domain';
import { InvalidOrMissingAuthenticationTokenException } from '@domain/auth/exceptions/invalid-or-missing-authentication-token.exception';

import {
  IUserRepository,
  USER_REPOSITORY,
} from '@infra/user/repositories/user.repository';

import { IS_PUBLIC } from '@application/auth/decorators/public.decorator';
import { SKIP_JWT } from '@application/auth/decorators/skip-jwt.decorator';

import { Request } from 'express';
import jwt, { JsonWebTokenError, JwtPayload } from 'jsonwebtoken';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    private readonly _reflector: Reflector,
    private readonly _envService: EnvService,
    @Inject(USER_REPOSITORY)
    private readonly _userRepository: IUserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const shouldSkip = this._getConst<boolean>(SKIP_JWT, context, false);
    if (shouldSkip) {
      return true;
    }
    const request: Request = context.switchToHttp().getRequest();
    const isPublic = this._getConst<boolean>(IS_PUBLIC, context, false);
    const token = _getAuthorizationToken(request);
    if (isPublic && !token) {
      request['user'] = none();
      return true;
    }
    if (!token) {
      _throwAuthorizationError();
    }
    const result = this._verify(token);
    if (result.isLeft()) {
      _throwAuthorizationError();
    }
    const userId: Id = result.value['id'];
    const user = await this._userRepository.findOneById(userId);
    if (user.isNone()) {
      _throwAuthorizationError();
    }
    request['user'] = some(user.value);
    return true;
  }

  private _getConst<T>(
    key: string | symbol,
    context: ExecutionContext,
    defaultValue: T,
  ): T {
    const resolvedValue = this._reflector.getAllAndOverride<T>(key, [
      context.getHandler(),
      context.getClass(),
    ]);
    return resolvedValue ?? defaultValue;
  }

  private _verify(token: string): IEither<JwtPayload, JsonWebTokenError> {
    try {
      const result = jwt.verify(token, this._envService.get('JWT_SECRET'));
      return right(result as JwtPayload);
    } catch (error) {
      return left(error as JsonWebTokenError);
    }
  }
}

function _throwAuthorizationError(): never {
  throw new InvalidOrMissingAuthenticationTokenException();
}

function _getAuthorizationToken(request: Request): string | null {
  const token = request.headers['authorization'];
  return token ? token.replace('Bearer', '').trim() : null;
}
