import * as argon from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { Test, TestingModule } from '@nestjs/testing';
import { UnauthorizedException } from '@nestjs/common';
import { UserRepository } from '@user/repositories/user-repository';
import { UserRepositoryMock, userMock } from '@user/user.service.spec';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtService, { provide: UserRepository, useClass: UserRepositoryMock }],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtService = module.get<JwtService>(JwtService);
  });

  it('should be defined', () => {
    expect(service).toBeInstanceOf(AuthService);
  });

  it('should sign in an user', async () => {
    jest.spyOn(argon, 'verify').mockResolvedValue(true);
    jest.spyOn(jwtService, 'signAsync').mockResolvedValue('token');
    jest.spyOn(UserRepositoryMock.prototype, 'findByLogin').mockResolvedValue(userMock);

    const token = await service.signIn(userMock.login, userMock.password);

    expect(token).toEqual({ token: 'token' });
  });

  it('should throw if user does not exists', async () => {
    jest.spyOn(argon, 'verify').mockResolvedValue(false);
    jest.spyOn(jwtService, 'signAsync').mockResolvedValue('token');
    jest.spyOn(UserRepositoryMock.prototype, 'findByLogin').mockResolvedValue(undefined);

    try {
      const token = await service.signIn(userMock.login, userMock.password);
      expect(token).toBeUndefined();
    } catch (error) {
      expect(error).toEqual(new UnauthorizedException('invalid credentials'));
    }
  });

  it('should throw if password does not match', async () => {
    jest.spyOn(argon, 'verify').mockResolvedValue(false);
    jest.spyOn(jwtService, 'signAsync').mockResolvedValue('token');
    jest.spyOn(UserRepositoryMock.prototype, 'findByLogin').mockResolvedValue(userMock);

    try {
      const token = await service.signIn(userMock.login, userMock.password);
      expect(token).toBeUndefined();
    } catch (error) {
      expect(error).toEqual(new UnauthorizedException('invalid credentials'));
    }
  });
});
