import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { DeepMockProxy, mockDeep } from 'jest-mock-extended';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  let jwtServiceMock = mockDeep<JwtService>();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: JwtService, useValue: jwtServiceMock },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    jwtServiceMock = module.get<JwtService>(
      JwtService,
    ) as DeepMockProxy<JwtService>;
  });
  it('should return a token when login and password are correct', async () => {
    const signInDto: SignInDto = { login: 'aprovame', password: 'aprovame' };
    jwtServiceMock.signAsync.mockResolvedValueOnce('mocked-token');

    const result = await service.signIn(signInDto);

    expect(result).toEqual({ access_token: 'mocked-token' });
    expect(jwtServiceMock.signAsync).toHaveBeenCalledWith(
      { username: 'aprovame' },
      { expiresIn: '1m' },
    );
  });

  it('should throw UnauthorizedException when login is incorrect', async () => {
    const signInDto: SignInDto = { login: 'wrong', password: 'aprovame' };

    await expect(service.signIn(signInDto)).rejects.toThrow(
      UnauthorizedException,
    );
  });

  it('should throw UnauthorizedException when password is incorrect', async () => {
    const signInDto: SignInDto = { login: 'aprovame', password: 'wrong' };

    await expect(service.signIn(signInDto)).rejects.toThrow(
      UnauthorizedException,
    );
  });
});
