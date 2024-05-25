import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../../src/auth/auth.service';
import { makeAuthDTO } from 'test/mocks/dtos.mock';
import { AuthInputDTO } from 'src/auth/dto/auth.input.dto';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedError } from 'src/auth/errors/unauthorized.error';
import { IUserRepository } from 'src/user/repositories/user.repository.interface';
import { makeUserEntity } from 'test/mocks/entities/user.entity.mock';
import { IUserEncrypter } from 'src/user/encrypters/user.encrypter.interface';

describe('AuthService', () => {
  let sut: AuthService;
  let dto: AuthInputDTO;
  let userRepositorySpy: IUserRepository;
  let encrypterSpy: IUserEncrypter;
  let jwtService: JwtService;

  beforeEach(async () => {
    const { login, password } = makeUserEntity();
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: IUserRepository,
          useValue: {
            findByLogin: jest.fn().mockResolvedValue({
              login,
              password,
            }),
          },
        },
        {
          provide: IUserEncrypter,
          useValue: {
            compare: jest.fn().mockResolvedValue(true),
          },
        },
        JwtService,
      ],
    }).compile();

    userRepositorySpy = module.get<IUserRepository>(IUserRepository);
    encrypterSpy = module.get<IUserEncrypter>(IUserEncrypter);

    jwtService = module.get<JwtService>(JwtService);
    jest
      .spyOn(jwtService, 'signAsync')
      .mockImplementation(() => Promise.resolve('jwt-token'));

    sut = module.get<AuthService>(AuthService);
    dto = makeAuthDTO();
  });

  test('should call userRepository method with the correct values', async () => {
    await sut.authenticate(dto);

    expect(userRepositorySpy.findByLogin).toHaveBeenCalledWith(dto.login);
  });

  test('should throw UnauthorizedError if user is not found in database', async () => {
    userRepositorySpy.findByLogin = jest.fn().mockResolvedValue(null);

    const promise = sut.authenticate(dto);

    await expect(promise).rejects.toThrow(UnauthorizedError);
  });

  test('should call encrypter with the correct values', async () => {
    const user = makeUserEntity();
    userRepositorySpy.findByLogin = jest.fn().mockResolvedValue(user);

    await sut.authenticate(dto);

    expect(encrypterSpy.compare).toHaveBeenCalledWith(
      dto.password,
      user.password,
    );
  });

  test("should throw UnauthorizedError if user's password does not match", async () => {
    encrypterSpy.compare = jest.fn().mockResolvedValue(false);

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
