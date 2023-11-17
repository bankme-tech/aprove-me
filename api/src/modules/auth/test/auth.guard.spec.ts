import { TestingModule, Test } from '@nestjs/testing';
import { mock } from 'jest-mock-extended';
import { UnauthorizedException, ExecutionContext } from '@nestjs/common';
import { AuthGuard } from '../auth.guard';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  const reflectorMock = mock<Reflector>();
  const jwtServiceMock = mock<JwtService>();

  const createExecutionContext = (): ExecutionContext => {
    const httpContext = {
      getRequest: jest.fn().mockReturnValue({
        headers: {
          authorization: 'Bearer validToken',
        },
      }),
    };
    return {
      switchToHttp: () => httpContext,
      getHandler: () => jest.fn(),
      getClass: () => jest.fn(),
    } as unknown as ExecutionContext;
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthGuard,
        {
          provide: Reflector,
          useValue: reflectorMock,
        },
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
      ],
    }).compile();

    authGuard = module.get<AuthGuard>(AuthGuard);
  });

  describe('canActivate', () => {
    it('should allow access for public routes', async () => {
      // ARRANGE
      jest.spyOn(reflectorMock, 'getAllAndOverride').mockReturnValueOnce(true);

      // ACT
      const result = await authGuard.canActivate(createExecutionContext());

      // ASSERT
      expect(result).toBe(true);
    });

    it('should throw UnauthorizedException for routes without a valid token', async () => {
      // ARRANGE
      let err;
      jest
        .spyOn(reflectorMock, 'getAllAndOverride')
        .mockImplementationOnce(() => {
          throw new UnauthorizedException();
        });

      // ACT & ASSERT
      try {
        await authGuard.canActivate(createExecutionContext());
      } catch (error) {
        err = error;
      }

      // ASSERT
      expect(err).toBeInstanceOf(UnauthorizedException);
    });

    it('should set user in request for routes with a valid token', async () => {
      // ARRANGE
      jest.spyOn(reflectorMock, 'getAllAndOverride').mockReturnValueOnce(false);
      jest
        .spyOn(jwtServiceMock, 'verifyAsync')
        .mockResolvedValueOnce({ userId: 1 });

      // ACT
      const context = createExecutionContext();
      await authGuard.canActivate(context);

      // ASSERT
      expect(context.switchToHttp().getRequest()['user']).toEqual({
        userId: 1,
      });
    });
  });
});
