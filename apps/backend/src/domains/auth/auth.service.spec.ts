import * as bcrypt from 'bcryptjs';
import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { PrismaService } from '../../services/prisma.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let jwtService: JwtService;
  let authService: AuthService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [AuthService, PrismaService, JwtService],
    }).compile();

    jwtService = moduleRef.get<JwtService>(JwtService);
    authService = moduleRef.get<AuthService>(AuthService);
    prismaService = moduleRef.get<PrismaService>(PrismaService);
  });

  describe('token', () => {
    it('it should return a jwt token', async () => {
      const token = 'asdasdasd';
      const payload = { name: 'John Doe' };

      jest.spyOn(jwtService, 'signAsync').mockImplementation(async () => token);

      const response = await authService.token(payload);

      expect(response).toStrictEqual(token);
    });
  });

  describe('signUp', () => {
    it('it should signUp a new user', async () => {
      const id = '123123';
      const data = {
        login: 'John Doe',
        password: '123',
      };

      jest
        .spyOn(prismaService.user, 'findUnique')
        // @ts-expect-error mocking for minimal reproduction
        .mockImplementation(async () => undefined);
      jest
        .spyOn(prismaService.user, 'create')
        // @ts-expect-error mocking for minimal reproduction
        .mockImplementation(async () => ({ id, login: data.login }));

      const response = await authService.signUp(data.login, data.password);

      expect(response).toStrictEqual({ id, login: data.login });
    });

    it('it should block an existing login from signing up', async () => {
      const data = {
        login: 'John Doe',
        password: '123',
      };

      jest
        .spyOn(prismaService.user, 'findUnique')
        // @ts-expect-error mocking for minimal reproduction
        .mockImplementation(async () => data);

      await expect(() =>
        authService.signUp(data.login, data.password),
      ).rejects.toThrow();
    });
  });

  describe('signIn', () => {
    it('it should signIn an existing user', async () => {
      const data = {
        id: '123',
        login: 'John Doe',
        password: '123',
      };

      jest
        .spyOn(prismaService.user, 'findUnique')
        // @ts-expect-error mocking for minimal reproduction
        .mockImplementation(async () => data);
      jest.spyOn(bcrypt, 'compare').mockImplementation(async () => true);

      const response = await authService.signIn(data.login, data.password);

      expect(response).toStrictEqual({ id: data.id, login: data.login });
    });

    it('it should block an inexistant user from signing in', async () => {
      const data = {
        id: '123',
        login: 'John Doe',
        password: '123',
      };

      jest
        .spyOn(prismaService.user, 'findUnique')
        // @ts-expect-error mocking for minimal reproduction
        .mockImplementation(async () => undefined);

      const response = await authService.signIn(data.login, data.password);

      expect(response).toBe(false);
    });
  });
});
