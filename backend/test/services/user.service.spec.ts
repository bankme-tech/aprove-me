import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from '../../src/user/user.service';
import { CreateUserInputDTO } from '../../src/user/dto/create-user.input.dto';
import { IUserRepository } from '../../src/user/repositories/user.repository.interface';
import { makeUserDTO } from 'test/mocks/dtos.mock';
import { makeUserEntity } from 'test/mocks/entities/user.entity.mock';
import { IUserEncrypter } from 'src/user/encrypters/user.encrypter.interface';
import { faker } from '@faker-js/faker';
import { UserEntity } from 'src/user/entities/user.entity';

describe('UserService', () => {
  let sut: UserService;
  let dto: CreateUserInputDTO;
  let encrypterSpy: IUserEncrypter;
  let userRepositorySpy: IUserRepository;
  let userRepositoryResponse: UserEntity;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: IUserEncrypter,
          useValue: {
            hash: jest.fn(),
          },
        },
        {
          provide: IUserRepository,
          useValue: {
            save: jest.fn(),
          },
        },
      ],
    }).compile();

    sut = module.get<UserService>(UserService);
    encrypterSpy = module.get<IUserEncrypter>(IUserEncrypter);
    userRepositorySpy = module.get<IUserRepository>(IUserRepository);

    userRepositoryResponse = makeUserEntity();
    jest
      .spyOn(userRepositorySpy, 'save')
      .mockResolvedValue(userRepositoryResponse);

    dto = makeUserDTO();
  });

  describe('create()', () => {
    test('should call encrypter hash with correct values', async () => {
      await sut.create(dto);

      expect(encrypterSpy.hash).toHaveBeenCalledWith(dto.password);
    });

    test('should call userRepository with correct values', async () => {
      const hashedPassword = faker.internet.password();
      jest.spyOn(encrypterSpy, 'hash').mockResolvedValue(hashedPassword);
      await sut.create(dto);

      expect(userRepositorySpy.save).toHaveBeenCalledWith({
        login: dto.login,
        password: hashedPassword,
      });
    });

    test('should return a user', async () => {
      const { id, login } = userRepositoryResponse;
      const result = await sut.create(dto);

      expect(result).toStrictEqual({
        id,
        login,
      });
    });
  });
});
