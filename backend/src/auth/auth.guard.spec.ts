import { ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { mock } from 'jest-mock-extended';
import { AuthGuard } from './auth.guard';
import { Request } from 'express';

describe('AuthGuard', () => {
  let authGuard: AuthGuard;
  let jwtServiceMock = mock<JwtService>();

  beforeEach(() => {
    jwtServiceMock = mock<JwtService>();
    authGuard = new AuthGuard(jwtServiceMock);
  });

  it('should return true if token is valid', async () => {
    const mockRequest = {
      headers: {
        authorization: 'Bearer valid-token',
      },
    } as unknown as Request;

    const mockContext = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue(mockRequest),
      }),
    } as unknown as ExecutionContext;

    jwtServiceMock.verifyAsync.mockResolvedValueOnce({ userId: 1 });

    const result = await authGuard.canActivate(mockContext);

    expect(result).toBe(true);
    expect(mockRequest['user']).toEqual({ userId: 1 });
    expect(jwtServiceMock.verifyAsync).toHaveBeenCalledWith('valid-token', {
      secret: 'changeit',
    });
  });

  it('should throw UnauthorizedException if no token is provided', async () => {
    const mockRequest = {
      headers: {},
    } as unknown as Request;

    const mockContext = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue(mockRequest),
      }),
    } as unknown as ExecutionContext;

    await expect(authGuard.canActivate(mockContext)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw UnauthorizedException if token is invalid', async () => {
    const mockRequest = {
      headers: {
        authorization: 'Bearer invalid-token',
      },
    } as unknown as Request;

    const mockContext = {
      switchToHttp: jest.fn().mockReturnValue({
        getRequest: jest.fn().mockReturnValue(mockRequest),
      }),
    } as unknown as ExecutionContext;

    jwtServiceMock.verifyAsync.mockRejectedValueOnce(new Error());

    await expect(authGuard.canActivate(mockContext)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
