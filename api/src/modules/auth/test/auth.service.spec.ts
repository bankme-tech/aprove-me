import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { mock } from 'jest-mock-extended';
import { IUsersService } from '../../../modules/users/interface/users-service.interface';
import { UsersService } from '../../../modules/users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let authService: AuthService;
  const usersServiceMock = mock<IUsersService>();
  const jwtServiceMock = mock<JwtService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UsersService, useValue: usersServiceMock },
        {
          provide: JwtService,
          useValue: jwtServiceMock,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  describe('signIn()', () => {
    const username = 'aprovame';
    const password = 'aprovame';
    const hashedPassword =
      '$2b$10$V7H3MnmpVnpyIwOuL.pOx.qjOYt0BkbDVnqscHA5VJSm1lqogtIz2';

    it('should sign in and return an access token for valid credentials', async () => {
      // ARRANGE
      jest.spyOn(usersServiceMock, 'findByUsername').mockResolvedValueOnce({
        id: '1',
        username,
        password: hashedPassword,
      });

      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
        return true;
      });

      const expectedAccessToken = 'mocked_access_token';
      jest
        .spyOn(jwtServiceMock, 'signAsync')
        .mockResolvedValueOnce(expectedAccessToken);

      // ACT
      const result = await authService.signIn(username, password);

      // ASSERT
      expect(result).toEqual({ access_token: expectedAccessToken });
    });

    it('should throw UnauthorizedException for invalid credentials', async () => {
      // ARRANGE
      jest.spyOn(usersServiceMock, 'findByUsername').mockResolvedValueOnce({
        id: '1',
        username,
        password: hashedPassword,
      });

      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => {
        return false;
      });

      // ACT & ASSERT
      await expect(authService.signIn(username, password)).rejects.toThrow(
        UnauthorizedException,
      );
    });

    it('should try to sign in and return UnauthorizedException for not found user', async () => {
      // ARRANGE
      const username = 'testuser';
      const password = 'testpassword';

      jest
        .spyOn(usersServiceMock, 'findByUsername')
        .mockResolvedValueOnce(null);

      // ACT & ASSERT
      await expect(authService.signIn(username, password)).rejects.toThrow(
        UnauthorizedException,
      );
    });
  });
});
