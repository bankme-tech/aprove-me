import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/auth/auth.service';
import { makeAuthDTO } from 'test/mocks/dtos.mock';
import { AuthInputDTO } from 'src/auth/dto/auth.input.dto';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedError } from 'src/auth/errors/unauthorized.error';

describe('AuthService', () => {
  let sut: AuthService;
  let dto: AuthInputDTO;
  let jwtService: JwtService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, JwtService],
    }).compile();

    jwtService = module.get<JwtService>(JwtService);
    jest
      .spyOn(jwtService, 'signAsync')
      .mockImplementation(() => Promise.resolve('jwt-token'));

    sut = module.get<AuthService>(AuthService);
    dto = makeAuthDTO();
  });

  test('should throw UnauthorizedError if credentials do not match the correct values', async () => {
    const promise = sut.authenticate(dto);

    await expect(promise).rejects.toThrow(UnauthorizedError);
  });

  test('should return a token if credentials match the correct values', async () => {
    const result = await sut.authenticate({
      login: 'aprovame',
      password: 'aprovame',
    });

    expect(result).toHaveProperty('token');
    expect(typeof result.token).toBe('string');
  });
});
