import { Test, TestingModule } from '@nestjs/testing';
import { RolesGuard } from './roles.guard';
import { Reflector } from '@nestjs/core';
import { ExecutionContext } from '@nestjs/common';
import { mock, MockProxy } from 'jest-mock-extended';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../users/entities/user.entity';

describe('RolesGuard', () => {
  let rolesGuard: RolesGuard;
  let reflector: MockProxy<Reflector>;
  let context: MockProxy<ExecutionContext>;

  beforeEach(async () => {
    reflector = mock<Reflector>();
    context = mock<ExecutionContext>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [RolesGuard, { provide: Reflector, useValue: reflector }],
    }).compile();

    rolesGuard = module.get<RolesGuard>(RolesGuard);
  });

  it('should be defined', () => {
    expect(rolesGuard).toBeDefined();
  });

  it('should return true if no roles are required', () => {
    reflector.getAllAndOverride.mockReturnValue(undefined);

    const result = rolesGuard.canActivate(context);

    expect(result).toBe(true);
    expect(reflector.getAllAndOverride).toHaveBeenCalledWith(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  });

  it('should return true if user has one of the required roles', () => {
    const requiredRoles: Role[] = [Role.ADMIN];
    const user = { role: Role.ADMIN };

    reflector.getAllAndOverride.mockReturnValue(requiredRoles);
    context.switchToHttp.mockReturnValue({
      getRequest: () => ({ user }),
    } as any);

    const result = rolesGuard.canActivate(context);

    expect(result).toBe(true);
    expect(reflector.getAllAndOverride).toHaveBeenCalledWith(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  });

  it('should return false if user does not have any of the required roles', () => {
    const requiredRoles: Role[] = [Role.ADMIN];
    const user = { role: Role.USER };

    reflector.getAllAndOverride.mockReturnValue(requiredRoles);
    context.switchToHttp.mockReturnValue({
      getRequest: () => ({ user }),
    } as any);

    const result = rolesGuard.canActivate(context);

    expect(result).toBe(false);
    expect(reflector.getAllAndOverride).toHaveBeenCalledWith(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  });

  it('should return false if there is no user', () => {
    const requiredRoles: Role[] = [Role.ADMIN];

    reflector.getAllAndOverride.mockReturnValue(requiredRoles);
    context.switchToHttp.mockReturnValue({
      getRequest: () => ({}),
    } as any);

    const result = rolesGuard.canActivate(context);

    expect(result).toBe(false);
    expect(reflector.getAllAndOverride).toHaveBeenCalledWith(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
  });
});
